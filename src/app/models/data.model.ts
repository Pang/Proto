export class ModelData {
    id: number;
    title: string;
    description: string;
    duration: string;
    releaseDate: Date;
    images: ModelImages[];
}

export class ModelImages {
    url: string;
    type: string;
}