import SpaceExperience from '@/components/SpaceExperience';

export default function Home() {
  return (
    <SpaceExperience
      initialLampOn
      initialOnboardingStep={null}
      useVisitedState={false}
    />
  );
}
