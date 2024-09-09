import React, { useEffect, useRef } from "react";
import { useMusicPlayer } from "../context/MusicPlayerContext";
let globalAudioContext = null;

const AudioVisualizer = () => {
  const canvasRef = useRef(null);
  const { audioSrc } = useMusicPlayer();
  const analyserRef = useRef(null);
  const audioElementRef = useRef(null); // Keep reference to the audio element

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = 2;
    const barGap = 1;
    const barColor = "rgb(0, 255, 0)";

    const draw = () => {
      if (!analyserRef.current) return;

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);
      canvasCtx.clearRect(0, 0, width, height);

      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];
        canvasCtx.fillStyle = barColor;
        canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight);
        x += barWidth + barGap;
      }

      requestAnimationFrame(draw);
    };

    if (audioSrc) {
      // Setup AudioContext and AnalyserNode
      if (!globalAudioContext) {
        globalAudioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
      }
      const audioContext = globalAudioContext;

      if (!analyserRef.current) {
        analyserRef.current = audioContext.createAnalyser();
      }
      const analyser = analyserRef.current;

      // Clean up previous audio element
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.src = "";
      }

      const audioElement = new Audio(audioSrc);
      audioElementRef.current = audioElement; // Update the reference
      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      audioElement.play();

      draw();
    } else {
      console.log("No audio source available.");
    }

    // Cleanup function
    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
      console.log("Audio element cleaned up.");
    };
  }, [audioSrc]);

  return <canvas ref={canvasRef} width={600} height={300} />;
};

export default AudioVisualizer;
