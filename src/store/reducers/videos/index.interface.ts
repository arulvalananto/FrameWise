export interface VideoState {
    id: string;
    name: string;
    durationInSeconds: number;
    state: 'Processed' | 'Processing';
    processingProgress: string;
}

export interface VideosState {
    isLoading: boolean;
    videos?: VideoState[];
}

export interface VideoDeleteState {
    videoId: string;
}
