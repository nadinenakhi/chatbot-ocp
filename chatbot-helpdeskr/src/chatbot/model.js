import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import trainingData from './trainingData.json'; 

export const labelsList = [
  'hardware_issue',
  'software_issue',
  'network_issue',
  'account_issue',
  'email_issue',
  'printer_issue',
  'phone_issue',
  'other_issue',
  'greeting',
  'goodbye',
  'thanks',
  'small_talk',
  'help_request',
  'bot_identity',
  'confirmation',
  'rejection',
  'gratitude'
];

let encoderModel = null;

export async function trainModel() {
  try {
    const model = await tf.loadLayersModel('indexeddb://chatbot-ticket-model');
    console.log('Loaded model from IndexedDB');
    encoderModel = await use.load(); 
    return model;
  } catch (err) {
    console.warn('No saved model found. Training a new one...');
  }
  encoderModel = await use.load();

  const embeddings = await Promise.all(
    trainingData.map(d => encoderModel.embed(d.input))
  );

  const xs = tf.concat(embeddings);
  const labels = trainingData.map(d => labelsList.indexOf(d.label));
  const ys = tf.oneHot(tf.tensor1d(labels, 'int32'), labelsList.length);

  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [512], units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: labelsList.length, activation: 'softmax' }));

  model.compile({
    optimizer: tf.train.adam(),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });

  await model.fit(xs, ys, { epochs: 100 });

  // Save after training
  await model.save('indexeddb://chatbot-ticket-model');

  console.log('✅ Model trained and saved!');
  return model;
}

export async function predictClass(model, sentence) {
  if (!encoderModel) encoderModel = await use.load();

  const embedding = await encoderModel.embed(sentence); // [1, 512]
  const prediction = model.predict(embedding);
  const classIndex = prediction.argMax(-1).dataSync()[0];
  return labelsList[classIndex];
}

