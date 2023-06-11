import React from 'react';
import ReactWordcloud from 'react-wordcloud';

type Word = {
    text: string;
    value: number;
};

type WordCloudProps = {
    words: Word[];
};

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
    return (
        <ReactWordcloud
            words={words}
            options={{
                fontSizes: [14, 150],
                rotationAngles: [0, 10],
                rotations: 0,
                enableOptimizations: true,
            }}
        />
    );
};

const MemoziedWordCloud = React.memo(WordCloud);
export default MemoziedWordCloud;
