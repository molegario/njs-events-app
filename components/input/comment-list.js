import Link from "next/link";
import classes from './comment-list.module.css';

export default function CommentList({ comments=[] }) {

  console.log("COMMENT::OUT", comments)

  return <ul className={classes.comments}>
    {
      comments.map(comment=><li key={comment._id}>
        {' '}
        <p>{comment.text}</p>
        <div>
          By <address>{comment.name}</address>
        </div>
      </li>)
    }
  </ul>;
}