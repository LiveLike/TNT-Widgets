"use client"
import dynamic from 'next/dynamic';
import('./components/LiveLikeTextAskWithSlider')

const LiveLikeNumberPredictionComponent = dynamic(
  () => import('./components/LiveLikeNumberPredictionComponent').then(mod => mod.LiveLikeNumberPredictionComponent),
  { ssr: false, loading: () => <p>Loading...</p> }
);

export default function Home() {
  return (
    <LiveLikeNumberPredictionComponent />
  );
}
