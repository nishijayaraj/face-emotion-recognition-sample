(async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");

  const image = document.querySelector("img");
  const canvas = faceapi.createCanvasFromMedia(image);
  const detection = await faceapi
    .detectAllFaces(image) //detectSingleFace(image)
    .withFaceLandmarks()
    .withFaceExpressions();

  const dimensions = {
    width: image.width,
    height: image.height,
  };
  console.log(detection);
  const resizedDimensions = faceapi.resizeResults(detection, dimensions);
  console.log(resizedDimensions);

  document.body.append(canvas);

  //faceapi.draw.drawDetections(canvas, resizedDimensions);
  //faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions);
  faceapi.draw.drawFaceExpressions(canvas, resizedDimensions);
})();
