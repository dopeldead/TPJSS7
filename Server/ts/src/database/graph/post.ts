import { GraphItem, Prop } from "../decorators";
import { Vertex, Edge }  from "../dbtypes";
import { Channel } from './Channel';
import { User } from './User';

@GraphItem("Post")
export class Post extends Vertex {
    @Prop({
        mandatory: true
    })
    message: string;

    channel?: Channel;
    user?: User
}

@GraphItem("POST_COMMENT")
export class PostCommentEdge extends Edge<Post, Post> {
}
