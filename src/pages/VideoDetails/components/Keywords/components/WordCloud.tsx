import React from 'react';
import { Resizable } from 're-resizable';
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
        <Resizable
            defaultSize={{
                width: '100%',
                height: '100%',
            }}
            className="flex flex-row items-center justify-center"
        >
            <div style={{ width: '100%', height: '100%' }}>
                <ReactWordcloud
                    words={words}
                    options={{
                        fontSizes: [14, 150],
                        rotationAngles: [0, 10],
                        rotations: 0,
                        enableOptimizations: true,
                        enableTooltip: false,
                        deterministic: true,
                    }}
                />
            </div>
        </Resizable>
    );
};

const MemoziedWordCloud = React.memo(WordCloud);
export default MemoziedWordCloud;
