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

export interface CustomBrand {
    referenceUrl: string;
    id: number;
    name: string;
    enabled: boolean;
    description: string;
    tags: string[];
}

export interface AppInitialState {
    defaultLanguageCode: string;
    customBrandSearchText: string;
    supportedLanguages: Language[];
    customBrands: CustomBrand[];
}
