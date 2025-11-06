import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import {
  Container,
  Description,
  InfoSection,
  InfoText,
  InfoTitle,
  ProgressBar,
  ProgressContainer,
  RemainingLabel,
  RollingLabel,
  ScrollContent,
  Title,
} from './styles';

export const SpendLimit = () => {
  // Mock data
  const remainingSpend = 5000;
  const rollingLimit = 5000;
  const progress = (remainingSpend / rollingLimit) * 100;

  return (
    <ScreenWrapper title="Spend Limit">
      <Container>
        <ScrollContent>
          <Title>Spend Limit</Title>
          <Description>
            Your spend limit is set for your safety by government guidance based on affordability
            indicators. In accordance with regulations in later versions of our app, you will be
            able to increase your spend limit.
          </Description>

          <RemainingLabel>Remaining Spend: £{remainingSpend}</RemainingLabel>
          <ProgressContainer>
            <ProgressBar progress={progress} />
          </ProgressContainer>
          <RollingLabel>Rolling Limit: £{rollingLimit}</RollingLabel>

          <InfoSection>
            <InfoTitle>What is a spend Limit?</InfoTitle>
            <InfoText>
              Spend limits are set for affordability and anti-money laundering purposes. We set a
              £5000 spend limit on a rolling 30-day basis. Spend limits decrease when you deposit
              and increase when you withdraw.
            </InfoText>
          </InfoSection>

          <InfoSection>
            <InfoTitle>Can my remaining spend be more than the monthly limit?</InfoTitle>
            <InfoText>
              Yes, it can be greater than £5000. If you end up withdrawing more than you deposit
              this can be the case.
            </InfoText>
          </InfoSection>
        </ScrollContent>
      </Container>
    </ScreenWrapper>
  );
};
