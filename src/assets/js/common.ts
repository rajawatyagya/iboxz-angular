// alert('brij!');
// importScript('MediaWiki:Tutorial-QuickRC.ts');

/**
 * Common.ts: Main script for audio pronunciation evaluation
 *
 * Authors:
 * Brij Mohan Lal Srivastava, 2017, GSoC, CMUSphinx
 */

// Function to load the dependencies, and callback

function getScripts(scripts, callback) {
    let progress = 0;
    scripts.forEach(script => {
        $.getScript(script, () => {
            if (++progress === scripts.length) { callback(); }
        });
    });
}

let dependencies;
dependencies = ['./recorder.ts',
                './callbackmanager.ts',
                './volumemeter.ts',
                './constants.ts'];

getScripts(dependencies, constraints => {

    let meter = null;
    let canvasContext = null;
    const WIDTH = 50;
    const HEIGHT = 50;
    let rafID = null;

    let evalResults = null;
    const grammarIds = [];

    // These will be initialized later
    let recognizer;
    let recorder;
    let callbackManager;
    let audioContext;
    const outputContainer;
    // Only when both recorder and recognizer do we have a ready application
    let isRecorderReady = true;
    const isRecognizerReady = false;
    let i16Buf;

    const outputSampleRate = 16000;
    let inSampleRate;

    // TO render the gadget body
    $(document).ready(() => {

      /*
      $('.audiotable tbody tr').append('<td>Try saying: \
            <button type="button" class="btn btn-default btn-rec">Record <i class="material-icons">fiber_manual_record</i></button> \
            <canvas class="meter" height="35px" width="25px"></canvas> \
            <button type="button" data-word="because" class="btn btn-default btn-stop">Stop <i class="material-icons">stop</i></button> \
            <span class="recaudio"></span> \
            <button type="button" class="btn btn-default btn-eq">Evaluate <i class="material-icons">equalizer</i></button> \
            <button type="button" class="btn btn-default btn-say">Say in phrase <i class="material-icons">insert_link</i></button> \
          </td>');
          */

      // Attach events
      $('.audiotable').on('click', 'button.btn-rec', evt => {
        audioContext.resume().then(() => startRecording(evt.target));
      });
      $('.audiotable').on('click', 'button.btn-stop', evt => {
        // alert('Stopped recording...');
        stopRecording(evt);
                // nullify the canvas
        canvasContext = null;
      });
      /*$('.audiotable').on('click', 'button.btn-play', function(evt) {
        alert('Started playing...');
      });*/
      $('.audiotable').on('click', 'button.btn-say', evt => {
        alert('Start saying...');
      });

      $('.audiotable').on('click', 'button.btn-eq', evt => {
        renderQuickRCDialog();
      });

      $('#prompt_text').tooltip({container: 'body', title: 'Enter a phrase or select a word to decode from step 1.', placement: 'bottom'});
    });

    $(document).ready(constraints => {
      callbackManager = new CallbackManager();
      spawnWorker('./recognizer.ts', worker => {
              // This is the onmessage function, once the worker is fully loaded
              worker.onmessage = e => {

                  // This is the case when we got new feats from featex library
                  if (e.data.hasOwnProperty('feats')) {

                    // For status update
                    const ff = [];
                    for (feat of e.data.feats) {
                      ff.push(feat.toFixed(2) + '');
                    }

                    updateStatus('<code class=\'featcode\'> feats ==> ' + ff.toString() + ' </code>');
                    get_intelligibility_score(e.data.feats, e.data.word);
                  }

                  // This is the case when we have a callback id to be called
                  if (e.data.hasOwnProperty('id')) {
                    const clb = callbackManager.get(e.data.id);
                    let data = {};
                    if ( e.data.hasOwnProperty('data')) { data = e.data.data; }
                    if (clb) { clb(data); }
                  }

                  // This is a case when the recognizer has a new hypothesis
                  if (e.data.hasOwnProperty('hypseg')) {
                    // var newHyp = e.data.hyp;
                    if (e.data.hasOwnProperty('final') &&  e.data.final) {
                      // newHyp = "Final: " + newHyp;
                      // compute_score(newHyp, e.data.hypseg);
                      if (e.data.hasOwnProperty('data')) {
                        if (e.data.data.stage === 0) {
                          // Send segmentation output to tri-phone processing
                          process_stage_1(e.data.hypseg);
                        }
                      }

                    } else {
                      console.log(e.data);
                    }
                    console.log(e.data);
                  }

                  // This is the case when we have an error
                  if (e.data.hasOwnProperty('status') && (e.data.status === 'error')) {
                  }
              };
              // Once the worker is fully loaded, we can call the initialize function
              initRecognizer();
          });

      try {
          // webkit shim
          window.AudioContext = window.AudioContext || window.webkitAudioContext;
          navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
          window.URL = window.URL || window.webkitURL;


          audioContext = new AudioContext();
          updateStatus('Audio context set up.');
          document.querySelector('button').addEventListener('click', function() {
              audioContext.resume().then(() => {
                  console.log('Playback resumed successfully');
                    });
                });
          console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));

          inSampleRate = audioContext.sampleRate;

        } catch (e) {
          alert('No web audio support in this browser!');
        }

      navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
            updateStatus('No live audio input: ' + e);
        });
      });

    function get_intelligibility_score(feats, word) {
        // var serviceUrl = "https://tools.wmflabs.org/proneval-gsoc17/pronserv";
          const serviceUrl = 'http://localhost:5555/pronserv';
          updateStatus('Getting intelligibility score...');

        // SENDING REQUEST TO SERVER
        /*$.ajax({
            url: serviceUrl,
            type: "POST",
            data: JSON.stringify({feats: feats, word: word}),
            contentType: "application/json; charset=utf-8",
            success: function(dat) { updateStatus("<code> Pronunciation intelligibility score ==> " + dat + "</code>"); }
        });*/

        // SENDING FEATS TO LOCAL KERAS.TS MODELS
          get_local_prediction(feats, word).then(pred => {
          console.log(pred);
          updateStatus('<pre><code> ' + JSON.stringify(pred, null, 4) + '</code></pre>');
        });
      }

    function decode_buffer_align(decodeWord, f32Arr) {
        // var i16Buf = new Int16Array(f32Arr.buffer);
        i16Buf = format_audio(f32Arr);
        // console.log(f32Arr);
        console.log(i16Buf.length, i16Buf);

        postRecognizerJob({command: 'lookupWord', data: decodeWord},
          cbdata => {
            console.log(cbdata);
            updateStatus('Extracting features ...');
            postRecognizerJob({command: 'featex', data: {array: i16Buf, word: decodeWord}});
          });
    }

    function process_stage_1(hypSeg) {
      console.log(hypSeg);
      const framesc = 160;
      for (let n = 1; n < hypSeg.length - 1; n++) {

        // Extract tri-phone sub segment
        const left = hypSeg[n - 1].word;
        const leftn = hypSeg[n - 1].start;
        const target = hypSeg[n].word;
        const right = hypSeg[n + 1].word;
        const rightn = hypSeg[n + 1].end;

        const sil = Array.apply(null, Array(16000)).map(Number.prototype.valueOf, 0);
        const subseg = sil.concat(i16Buf.slice(leftn * framesc, rightn * framesc)).concat(sil);
        const apGram = generateAllPhonemesGrammar(left, right);
        // Decode using all phonemes1 grammar
      }
    }

    function compute_score(newHyp, hypseg) {
        // Calculate mean
            let mean = 0.0;
            // var hypseg = e.data.hypseg;
            let cnt = 0;
            for (hyp of hypseg) {
              if (PROREMEDY.VALID_WORDS.indexOf(hyp.word) !== -1) {
                cnt++;
                mean += hypseg[i].ascr;
              }
            }
            mean /= cnt;

            // Calculate std deviation
            cnt = 0;
            let std = 0;
            for (hyp of hypseg) {
              if (PROREMEDY.VALID_WORDS.indexOf(hyp.word) !== -1) {
                cnt++;
                const diff = (hypseg[i].ascr - mean);
                std += (diff * diff);
              }
            }
            std /= cnt;

            std = Math.sqrt(std);

            console.log('Mean = ' + mean);
            console.log('Std = ' + std);

            const meanVarStr = '<p> Mean : ' + mean.toFixed(2) + '<br> Std. deviation : ' + std.toFixed(2) + '</p>';

            // var tableStr = "<table border='1'><tr><td>Word</td><td>Normalized score</td><td>Duration</td></tr>";
            let tableStr = '<table class=\'table table-bordered\'>';
            let tr1 = '<tr><th>Word</th>';
            let tr2 = '<tr><th>Normalized score</th>';
            let tr3 = '<tr><th>Duration</th>';
            for (i = 0; i < hypseg.length; i++) {
              if (PROREMEDY.VALID_WORDS.indexOf(hypseg[i].word) !== -1) {
                const score = (hypseg[i].ascr - mean) / std;
                // tableStr += "<tr><td>" + hypseg[i].word + "</td><td>" + score + "</td><td>" +
                // ((hypseg[i].end - hypseg[i].start)/100.0) + "</td></tr>";
                tr1 += '<td>' + hypseg[i].word + '</td>';
                tr2 += '<td>' + score.toFixed(2) + '</td>';
                tr3 += '<td>' + ((hypseg[i].end - hypseg[i].start) / 100.0) + '</td>';
                console.log('Word = ' + hypseg[i].word + ' : Score = ' + score + ' : Duration = ' +
                  (hypseg[i].end - hypseg[i].start) / 100.0);
              }
            }
            tableStr += (tr1 + '</tr>');
            tableStr += (tr2 + '</tr>');
            tableStr += (tr3 + '</tr>');
            tableStr += '</table>';

            content_str = newHyp + '<br><br>' + meanVarStr + tableStr + '<br>' +
              '<img class=\'fbimg\' src=\'https://raw.githubusercontent.com/brijmohan/iremedy/gh-pages/feedback.png\'>';
            evalResults = content_str;

            renderQuickRCDialog(content_str);
      }

    // Volume meter code for connecting audio stream to visual update
    function gotStream(stream) {
        // Create an AudioNode from the stream.
        mediaStreamSource = audioContext.createMediaStreamSource(stream);

        // Create a new volume meter and connect it.
        meter = createAudioMeter(audioContext);
        mediaStreamSource.connect(meter);

        // kick off the visual updating
        drawLoop();
    }

    function drawLoop( time ) {
          if (canvasContext) {
          // clear the background
          canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

          // check if we're currently clipping
          if (meter.checkClipping()) {
              canvasContext.fillStyle = 'red';
          } else {
              canvasContext.fillStyle = 'green';
          }

          // draw a bar based on the current volume
          canvasContext.fillRect(0, HEIGHT - meter.volume * HEIGHT * 5, WIDTH, meter.volume * HEIGHT * 5);

          // set up the next visual callback
          rafID = window.requestAnimationFrame( drawLoop );
          }
    }

    function renderQuickRCDialog( content ) {
        if (!content) { content = evalResults; }
        const $dialog = $( '<div></div>' )
        .html(
          '<strong>' +
          mw.message('quickchanges-greeting', mw.user.getName()).escaped() +
          '</strong> ' +
          '<br/>' + content
        )
        .dialog({
          autoOpen: true,
          title: mw.message('quickchanges-title').plain(),
          width: '70%',
          modal: true
        });
    }

      // This starts recording. We first need to get the id of the grammar to use
    const startRecording = targetEle => {
        const decodeWord = $.trim($('#prompt_text').val());
        if (decodeWord !== '') {
          $('#prompt_text').tooltip('hide');
          console.log(decodeWord);
          if (recorder) { recorder.record(); }
          clearStatus();
          // grab our canvas
          console.log(targetEle);
          canvasContext = $(targetEle).parents('td').find('.meter')[0].getContext('2d');
          drawLoop();
        } else {
          // raise tooltip
          console.log('No decode word');
          $('#prompt_text').tooltip('show');
        }
      };

    // Stops recording
    const stopRecording = evt => {
      recorder && recorder.stop();
      createDownloadLink(evt);
        // var decodeWord = $(evt.target).parents('td').find('.btn-stop').data('word');
      const decodeWord = $('#prompt_text').val();
      console.log('Decode==>', decodeWord);
      recorder.getBuffer(buf => {
          // console.log(buf);
          if (decodeWord !== '') {
            decode_buffer_align(decodeWord, buf[0]);
          } else {
            updateStatus('There is no word to decode!');
          }
        });
      recorder.clear();
    };

    function format_audio(inputArray) {
        // Convert the float samples to 16-bit integers
        const output = new Int16Array(inputArray.length);
        for (let i = 0; i < inputArray.length; i++) {
            const s = Math.max(-1, Math.min(1, inputArray[i]));
            // output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
            output[i] = s * 0xFFFF;
        }

        // Downsample audio to 16k
        console.log(inSampleRate, outputSampleRate);
        const outputBufferLength = Math.floor(output.length * outputSampleRate / inSampleRate);
        let result = new Int16Array(outputBufferLength);
        let bin = 0;
        let num = 0;
        let indexIn = 0;
        let indexOut = 0;
        while (indexIn < outputBufferLength) {
          bin = 0;
          num = 0;
          while (indexOut < Math.min(output.length, (indexIn + 1) * inSampleRate / outputSampleRate)) {
              bin += output[indexOut];
              num += 1;
              indexOut++;
          }
          result[indexIn] = bin / num;
          indexIn++;
        }

        // AGC
        let maxVal = -32768;
        for (res of result) {
            maxVal = Math.abs(res) > maxVal ? Math.abs(res) : maxVal;
        }

        const scale = Math.floor(32767 / maxVal);
        console.log('Max value : ' + maxVal + ' ==> Scaling by factor: ' + scale);
        result = result.map(x => x * scale);

        return result;
    }

    function createDownloadLink(evt) {
        recorder && recorder.exportWAV(blob => {
          const url = URL.createObjectURL(blob);
          const au = document.createElement('audio');

          au.controls = true;
          au.src = url;
          // $(evt.target).parents('td.audiofile').find('span.recaudio').html(au);
          console.log($(evt.target).parents('tr').find('td.audiofile'));
          $(evt.target).parents('tr').find('td.audiofile').html(au);
        });
    }

    function startUserMedia(stream) {
      // var input = audioContext.createMediaStreamSource(stream);
        console.log('Media stream created.');
        const input = audioContext.createMediaStreamSource(stream);
        // Firefox hack https://support.mozilla.org/en-US/questions/984179
        window.firefox_audio_hack = input;
        const audioRecorderConfig = {
          errorCallback(x) {
            updateStatus('Error from recorder: ' + x);

          },
          sampleRate: 16000,
          numChannels: 1
        };
        recorder = new Recorder(input, audioRecorderConfig);
        // If a recognizer is ready, we pass it to the recorder
        // if (recognizer) recorder.consumers = [recognizer];
        isRecorderReady = true;
        updateStatus('Audio recorder ready');
        // recorder = new Recorder(input);
        updateStatus('Recorder initialised.');
        gotStream(stream);
      }

    // A convenience function to post a message to the recognizer and associate
    // a callback to its response
    function postRecognizerJob(message, callback) {
        const msg = message || {};
        if (callbackManager) { msg.callbackId = callbackManager.add(callback); }
        if (recognizer) { recognizer.postMessage(msg); }
    }

    // This is just a logging window where we display the status
    function updateStatus(newStatus) {
        console.log(newStatus);
        const oldStatus = $('div#status').html();
        $('div#status').html(oldStatus + '<br><br>' + newStatus);
    }

    function clearStatus() {
      $('div#status').html('');
    }

    // This function initializes an instance of the recorder
    // it posts a message right away and calls onReady when it
    // is ready so that onmessage can be properly set
    function spawnWorker(workerURL, onReady) {
      recognizer = new Worker(workerURL);
      recognizer.onmessage = event => {
        onReady(recognizer);
      };
      recognizer.postMessage('');
    }

    function generateAlignGrammar(word) {
      const pron = PROREMEDY.CMUDICT[word].toLowerCase().split(' ');
      let ti;
      const alignGram = {
        numStates: pron.length + 3,
        start: 0,
        end: pron.length + 2,
        transitions: []
      };
      alignGram.transitions.push({from: 0, to: 1, word: 'sil'});
      for (ti = 1; ti < pron.length + 1; ti++) {
        alignGram.transitions.push({from: ti, to: ti + 1, word: pron[ti - 1]});
      }
      alignGram.transitions.push({from: pron.length + 1, to: pron.length + 2, word: 'sil'});
      alignGram.transitions.push({from: pron.length + 1, to: pron.length + 2, word: ''});
      return alignGram;
    }

    function generateAllPhonemesGrammar(leftWord, rightWord) {
      let numstates = 6;
      let endState = 5;
      if (leftWord === 'sil') {
        numstates--;
        endState--;
      }
      if (rightWord === 'sil') {
        numstates--;
        endState--;
      }
      const allphoneGram = {
        numStates: numstates,
        start: 0,
        end: endState,
        transitions: []
      };
      allphoneGram.transitions.push({from: 0, to: 1, word: 'sil'});
      let statenum = 1;
      if (leftWord !== 'sil') {
        allphoneGram.transitions.push({from: 1, to: 2, word: leftWord});
        statenum++;
      }
      let ti;
      for (ti = 0; ti < PROREMEDY.ALLPHONEMES1.length; ti++) {
        allphoneGram.transitions.push({from: statenum, to: statenum + 1, word: PROREMEDY.ALLPHONEMES1[ti]});
      }
      statenum++;
      if (rightWord !== 'sil') {
        allphoneGram.transitions.push({from: statenum, to: statenum + 1, word: rightWord});
        statenum++;
      }
      allphoneGram.transitions.push({from: statenum, to: statenum + 1, word: 'sil'});
      allphoneGram.transitions.push({from: statenum, to: statenum + 1, word: ''});

      return allphoneGram;
    }

    // This adds a grammar from the grammars array
    // We add them one by one and call it again as
    // a callback.
    // Once we are done adding all grammars, we can call
    // recognizerReady()
    /*var feedGrammar = function(g, index, id) {
        if (id && (grammarIds.length > 0)) grammarIds[0].id = id.id;
        if (index < g.length) {
            grammarIds.unshift({title: g[index].title})
          postRecognizerJob({command: 'addGrammar', data: g[index].g},
                    function(id) {feedGrammar(PROREMEDY.GRAMMARS, index + 1, {id:id});});
        } else {
          recognizerReady();
        }
    }*/

    // This adds words to the recognizer. When it calls back, we add grammars
    const feedWords = words => {
        postRecognizerJob({command: 'addWords', data: words},
          () => {
              // feedGrammar(PROREMEDY.GRAMMARS, 0);
              // TODO: INDICATE THAT RECOGNIZER IS USABLE NOW
              // console.log("Decoder must be ready now!!!");
              updateStatus('Decoder must be ready now!!!');
            });
    };

    // This initializes the recognizer. When it calls back, we add words
    const initRecognizer = () => {
        // You can pass parameters to the recognizer, such as : {command: 'initialize', data: [["-hmm", "my_model"], ["-fwdflat", "no"]]}
        const psConfig = [
            ['-topn', '64'],
            ['-beam', '1e-57'],
            ['-wbeam', '1e-56'],
            ['-maxhmmpf', '-1'],
            ['-samprate', '16000'],
            ['-frate', '65'],
            ['-fsgusefiller', 'no']
          ];
        postRecognizerJob({command: 'initialize', data: psConfig},
          () => {
                                // if (recorder) recorder.consumers = [recognizer];
                                feedWords(PROREMEDY.WORDLIST);
                         });
    };

});
