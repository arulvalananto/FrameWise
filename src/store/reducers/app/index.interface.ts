export interface Language {
    isAutoDetect: boolean;
    isRightToLeft: boolean;
    isSourceLanguage: boolean;
    isSupportedForCustomModels: boolean;
    isSupportedForLanguageDataset: boolean;
    isSupportedForPronunciationDataset: boolean;
    isSupportedForTranslation: boolean;
    languageCode: string;
    name: string;
}

export interface AppInitialState {
    defaultLanguageCode: string;
    supportedLanguages: Language[];
}
