export interface VideoState {
    id: string;
    name: string;
    durationInSeconds: number;
    state: 'Processed' | 'Processing';
    processingProgress: string;
    thumbnailId: string;
    lastModified: Date;
}

export interface VideosState {
    isLoading: boolean;
    videos: VideoState[];
    sortedBy: 'name' | '-name' | 'lastModified' | '-lastModified';
}

export interface VideoDeleteState {
    videoId: string;
}
