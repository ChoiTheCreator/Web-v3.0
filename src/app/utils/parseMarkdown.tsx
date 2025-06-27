import { Text } from '@react-pdf/renderer';

export const parseMarkdown = (md: string) => {
  const lines = md.split('\n');

  return lines.map((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('# ')) {
      return (
        <Text
          key={idx}
          style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}
        >
          {trimmed.replace('# ', '')}
        </Text>
      );
    }

    if (trimmed.startsWith('## ')) {
      return (
        <Text
          key={idx}
          style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
        >
          {trimmed.replace('## ', '')}
        </Text>
      );
    }

    if (trimmed.startsWith('- ')) {
      return (
        <Text key={idx} style={{ fontSize: 12, marginLeft: 10 }}>
          • {trimmed.replace('- ', '')}
        </Text>
      );
    }

    if (trimmed === '') {
      return (
        <Text key={idx} style={{ marginBottom: 10 }}>
          {' '}
        </Text>
      );
    }

    return (
      <Text key={idx} style={{ fontSize: 12, marginBottom: 4 }}>
        {trimmed}
      </Text>
    );
  });
};
