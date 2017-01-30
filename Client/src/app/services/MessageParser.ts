import { 
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
from '../models';

const youtubeRegex =  /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
const videoRegex = /http[s]?:\/\/.+\.(mp4|ogg|webm)/gmi;

const youtube = "https://youtu.be/";

export class MessageParser {

    parse(post: Post): PostContent<any> {
        const youtubeMatche = youtubeRegex.exec(post.message);
        const pictureMatche = pictureRegex.exec(post.message);
        const videoMatche = videoRegex.exec(post.message);

        if(pictureMatche) {
           return new PicturePostContent(pictureMatche[0]);
        }
        if(youtubeMatche) {
           return new YoutubePostContent(youtubeMatche[0]);
        }
        if(videoMatche) {
           return new VideoPostContent(videoMatche[0]);
        }
        return null;
    }
}
