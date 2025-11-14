import OnboardingWelcome from "../../pages/OnboardingWelcome";

export default function OnboardingWelcomeExample() {
  return (
    <OnboardingWelcome
      onGetStarted={() => console.log('Get started clicked')}
    />
  );
}
