import Link from "next/link";
import classes from './comment-list.module.css';
import { Fragment, useContext } from "react";
import LoadingContext from "../../store/loading-context";

export default function CommentList({ comments=[] }) {
  const loadingCtx = useContext(LoadingContext);

  console.log("COMMENT::OUT", comments, loadingCtx.isLoading);


  return <Fragment>
    {
      loadingCtx.isLoading && <p className="center">Loading...</p>
    }
    <ul className={classes.comments}>
    {
      comments.map(comment=><li key={comment._id}>
        {' '}
        <p>{comment.text}</p>
        <div>
          By <address>{comment.name}</address>
        </div>
      </li>)
    }
    </ul>
  </Fragment>;
}