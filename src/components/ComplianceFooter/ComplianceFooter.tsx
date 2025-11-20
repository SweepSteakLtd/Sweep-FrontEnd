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
  Section,
} from './styles';

// Import local logo images
const visaLogo = require('~/assets/images/compliance/visa.png');
const mastercardLogo = require('~/assets/images/compliance/mastercard.png');
const gamstopLogo = require('~/assets/images/compliance/gamstop.png');
const gambleawareLogo = require('~/assets/images/compliance/gambleaware.png');

export const ComplianceFooter = () => {
  const handleGambleAwarePress = () => {
    Linking.openURL('https://www.gambleaware.org/');
  };

  const handleGamstopPress = () => {
    Linking.openURL('https://www.gamstop.co.uk/');
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
        </View>
      </Section>
      <Section>
        <Link onPress={handleGambleAwarePress} activeOpacity={0.7}>
          <Logo source={gambleawareLogo} resizeMode="contain" style={{ width: 120, height: 40 }} />
        </Link>
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
