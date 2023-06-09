export interface Instance {
    start: string;
    end: string;
    brandType?: string;
    instanceSource?: 'Transcript';
    confidence?: number;
}

export interface Brand {
    description: string;
    confidence: number;
    id: string;
    instances: Instance[];
    name: string;
    referenceUrl: string;
    referenceType: string;
}

export interface Emotion {
    id: string;
    type: string;
    instances: Instance[];
}

export interface Face {
    id: string;
    confidence: number;
    name: string;
    title?: string | null;
    thumbnailId: string;
    instances: Instance[];
    imageUrl?: string | null;
    description?: string | null;
}

export interface Keyword {
    id: string;
    confidence: number;
    instances: Instance[];
    text: string;
}

export interface Label {
    id: string;
    instances: Instance[];
    name: string;
    referenceId: string;
    language: string;
}

export interface NamedPerson {
    id: string;
    confidence: number;
    name: string;
    description?: string | null;
    referenceId?: string | null;
    referenceUrl?: string | null;
    instances: Instance[];
    isCustome: boolean;
}

export interface NamedLocation {
    id: string;
    confidence: number;
    name: string;
    description?: string | null;
    referenceId?: string | null;
    referenceUrl?: string | null;
    instances: Instance[];
    isCustome: boolean;
}

export interface Topic {
    id: string;
    name: string;
    confidence: number;
    iabName?: string | null;
    referenceId?: string | null;
    referenceUrl?: string | null;
    instances: Instance[];
}

export interface Insights {
    brands: Brand[];
    emotions: Emotion[];
    namedPeople: NamedPerson[];
    faces: Face[];
    topics: Topic[];
    keywords: Keyword[];
    labels: Label[];
    namedLocations: NamedLocation[];
}

export interface VideoInsightDetail {
    id: 'string';
    insights: Insights;
    thumbnailId: string;
    processingState: string;
    state: 'Processed' | 'Processing';
}

export interface VideoDetails {
    id: string;
    name: string;
    userName: string;
    durationInSeconds: number;
    summarizedInsights?: Insights;
    videos?: VideoInsightDetail[];
}

export interface VideoDetailsState {
    isLoading: boolean;
    insights: Insights | null;
    videoDetails: VideoDetails | null;
    currentStartTime: number;
    selectedInsight: {
        keyword: Keyword | null;
        label: Label | null;
        namedLocation: NamedLocation | null;
        topic: Topic | null;
        brand: Brand | null;
        face: Face | null;
        emotion: Emotion | null;
        namedPerson: NamedPerson | null;
    };
}

export interface fetchVideoDetailsPayload {
    id: string;
}