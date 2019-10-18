
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


const MODELS = {};

function load_model(word) {
	MODELS[word] = new KerasJS.Model({
	  filepaths: {
	    model: '../../../assets/models/'+word+'.json',
	    weights: '../../../assets/models/'+word+'_weights.buf',
	    metadata: '../../../assets/models/'+word+'_metadata.json'
	  },
	  gpu: true
	});
}


async function get_local_prediction(feats, phrase) {
  const words = phrase.split(' ').clean();
  let fstart = 0, featlen = 0, inputData, wfeats;
  const preds = [];
  for (let widx = 0; widx < words.length; widx++) {
    const word = words[widx];
    if (!MODELS.hasOwnProperty(word)) {
			load_model(word);
		}

		console.log(word, widx);
		try {
		  	await MODELS[word].ready();
		  	featlen = MODELS[word].modelLayersMap.get("input").shape[0];
	  		wfeats = feats.slice(fstart, fstart + featlen);
	  		fstart = fstart + featlen - 1;
		  	inputData = {
		    	'input': new Float32Array(wfeats)
			}
		  	let outputData = await MODELS[word].predict(inputData);
      console.log(outputData);
		  	preds.push({"word": word, "pred": outputData.output[1].toFixed(2)});
		} catch (err) {
		  // handle error
		}
	}
	return preds;
}
