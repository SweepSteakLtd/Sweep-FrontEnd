import React from 'react';
import { Linking, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  BuildNumber,
  CompanyNumber,
  Container,
  Divider,
  LicenceNumber,
  Link,
  Logo,
  PairRow,
  Section,
} from './styles';

// Import local logo images
const visaLogo = require('~/assets/images/compliance/visa.png');
const mastercardLogo = require('~/assets/images/compliance/mastercard.png');
const gamstopLogo = require('~/assets/images/compliance/gamstop.png');
const gambleawareLogo = require('~/assets/images/compliance/gambleaware.png');
const gamCareHelplineLogo = require('~/assets/images/compliance/GamCare-Helpline.png');
const gcLogo = require('~/assets/images/compliance/GC_logo.png');
const gamblingAddictionLogo = require('~/assets/images/compliance/Gambling_Addiction.png');

export const ComplianceFooter = () => {
  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  const handleGambleAwarePress = () => {
    openUrl('https://www.gambleaware.org/');
  };

  const handleGamstopPress = () => {
    openUrl('https://www.gamstop.co.uk/');
  };

  const version = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();
  const isDevBuild = __DEV__;

  const buildDisplay = isDevBuild
    ? `Build: v${version} (dev)`
    : `Build: v${version} (${buildNumber})`;

  return (
    <Container>
      <Section>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Logo source={visaLogo} resizeMode="contain" />
          <Logo source={mastercardLogo} resizeMode="contain" />
          <Link onPress={handleGamstopPress} activeOpacity={0.7}>
            <Logo source={gamstopLogo} resizeMode="contain" style={{ width: 120, height: 50 }} />
          </Link>
          <Link onPress={() => openUrl('https://www.gamblingcommission.gov.uk/')} activeOpacity={0.7}>
            <Logo source={gcLogo} resizeMode="contain" style={{ width: 90, height: 50 }} />
          </Link>
        </View>
      </Section>
      <Section>
        <PairRow style={{ paddingLeft: 14 }}>
          <Link onPress={handleGambleAwarePress} activeOpacity={0.7} style={{ marginRight: 12 }}>
            <Logo source={gambleawareLogo} resizeMode="contain" style={{ width: 120, height: 30 }} />
          </Link>

          <Link
            onPress={() => openUrl('https://gordonmoody.org.uk/gambling-therapy/')}
            activeOpacity={0.7}
          >
            <Logo
              source={gamblingAddictionLogo}
              resizeMode="contain"
              style={{ width: 180, height: 30 }}
            />
          </Link>
        </PairRow>
      </Section>

      <Section>
        <PairRow>
          <Link
            onPress={() => openUrl('https://www.gamcare.org.uk/')}
            activeOpacity={0.7}
            style={{ flex: 1, minWidth: 0 }}
          >
            <Logo
              source={gamCareHelplineLogo}
              resizeMode="contain"
              style={{ width: '100%', height: 53 }}
            />
          </Link>
        </PairRow>
      </Section>
      <Divider />

      <Section>
        <LicenceNumber>GC Licence: 000-067618-R-341349-001</LicenceNumber>
        <CompanyNumber>Companies House: 16294031</CompanyNumber>
        <BuildNumber>{buildDisplay}</BuildNumber>
      </Section>
    </Container>
  );
};
