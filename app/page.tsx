import dynamic from 'next/dynamic';

const LiveLikeNumberPredictionComponent = dynamic<{}>(
  () => import('./components/LiveLikeNumberPredictionComponent').then(mod => mod.LiveLikeNumberPredictionComponent),
  { ssr: false }
);

export default function Home() {
  return (
    <LiveLikeNumberPredictionComponent/>
  );
}
