import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '~/components/Typography/Typography';
import { Container, TimeLabel, TimeRow, TimeValue } from './styles';

type LeagueDatesProps = {
  startTime?: string;
  endTime?: string;
};

export const LeagueDates = ({ startTime, endTime }: LeagueDatesProps) => {
  const theme = useTheme();

  if (!startTime || !endTime) {
    return null;
  }

  const formatDate = (dateString: string, onlyDate: boolean, onlyTime: boolean) => {
    const date = new Date(dateString);
    if (onlyDate) {
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
    if (onlyTime) {
      return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Container>
      <TimeRow style={{ marginBottom: 12 }}>
        <Typography variant="body" color={theme.colors.text.primary} style={{ fontSize: 20 }}>
          📅
        </Typography>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TimeLabel>Starts</TimeLabel>
          <TimeValue>{formatDate(startTime, true, false)}</TimeValue>
          <TimeValue>{formatDate(startTime, false, true)}</TimeValue>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TimeLabel>Ends</TimeLabel>
          <TimeValue>{formatDate(endTime, true, false)}</TimeValue>
          <TimeValue>{formatDate(endTime, false, true)}</TimeValue>
        </View>
      </TimeRow>
    </Container>
  );
};
