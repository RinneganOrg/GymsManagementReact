import React, { useState, useEffect } from 'react'
import CommentForm from './CommentForm'
import { Comment, Header, Rating, Icon } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteComment, setComments } from '../../store/actions/comments'
import { useAuth } from '../../Utils/context';

const Comments = (props) => {
  const dispatch = useDispatch()
  const [mode, setMode] = useState('add');
  const [commentId, setCommentId] = useState('');
  const selectComments = state => state.comments
  const { comments } = useSelector(selectComments)
  const filterComments = (comment) => {
    return (props.gymId !== undefined && comment.gymId === props.gymId) ||
      (props.trainerId !== undefined && comment.trainerId === props.trainerId) ||
      (props.courseId !== undefined && comment.courseId === props.courseId)
  }
  const auth = useAuth() || {};
  const changeToEditMode = (commentId) => {
    setCommentId(commentId)
    setMode('edit')
  }
  const changeToAddMode = () => {
    setCommentId('')
    setMode('add')
  }
  const onDeleteComment = (comment) => {
    dispatch(deleteComment(
      `http://localhost:8000/comments/${comment._id}`
    )
    )
  }
  useEffect(
    () => dispatch(setComments()),
    []
  )

  return (
    <>
      <Comment.Group>
        <Header as='h3' dividing>
          Reviews
        </Header>
        {auth && comments ?
          <CommentForm
            gymId={props.gymId}
            trainerId={props.trainerId}
            courseId={props.courseId}
            mode={mode}
            changeMode={changeToAddMode}
            commentId={commentId} />
          :
          null}
        {comments && comments.length >= 0 ?
          comments.filter(filterComments).map((comment) => (
            <Comment key={comment._id}>
              <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>{auth.email}</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                  <Rating icon='star' rating={comment.rating} maxRating={5} disabled />
                </Comment.Metadata>
                <Comment.Text>{comment.comment}</Comment.Text>
                {auth && auth._id === comment.userId ?
                  <Comment.Actions>
                    <Comment.Action onClick={() => changeToEditMode(comment._id)}>Edit
                    </Comment.Action>
                    <Comment.Action>
                      <Icon name='trash' color="red" onClick={() => onDeleteComment(comment)} />
                    </Comment.Action>
                  </Comment.Actions> : null}
              </Comment.Content>
            </Comment>)) : null}
      </Comment.Group>
    </>
  )
}

export default Comments