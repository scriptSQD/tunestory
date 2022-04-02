export interface Media {
    id: number;
    attributes: {
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: {
            thumbnail: {
                url: string;
                width: number;
                height: number;
                mime: string;
            };
        };
        url: string;
        mime: string;
    };
}
