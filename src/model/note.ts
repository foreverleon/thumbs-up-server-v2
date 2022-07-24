
export interface Note {
    id: string;
    gif: string;
    senderId: string;
    receiverId: string;
    channelId: string;
    replyGif?: string;
    likes?: {
        userName: string;
        createdDate: Date;
    };
    createdDate: Date;
    updatedDate: Date;
    replyDate?: Date;
}

export interface Member {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
}

export interface Channel {
    id: string;
    typeId: string;
    name: string;
}

export interface TemporaryDataFile {
    notes: Note[];
    members: Member[];
    channels: Channel[];
}