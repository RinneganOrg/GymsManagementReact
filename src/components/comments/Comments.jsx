import React, { useState } from 'react'
import CommentForm from './CommentForm'
import { Comment, Header, Rating, Icon } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteComment } from '../../store/actions/comments'

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
  const changeToEditMode = (commentId) => {
    setCommentId(commentId)
    setMode('edit')
  }
  const changeToAddMode = () => {
    setCommentId('')
    setMode('add')
  }
  const onDeleteComment = (comment) => {
    dispatch(deleteComment(comment))
  }
  return (
    <>
      <Comment.Group>
        <Header as='h3' dividing>
          Reviews
        </Header>
        <CommentForm gymId={props.gymId} trainerId={props.trainerId} courseId={props.courseId} mode={mode} changeMode={changeToAddMode} commentId={commentId} />
        {comments.filter(filterComments).map((comment) => (
          <Comment key={comment.id}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
                <Rating icon='star' rating={comment.rating} maxRating={5} disabled />
              </Comment.Metadata>
              <Comment.Text>{comment.comment}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={() => changeToEditMode(comment.id)}>Edit
                </Comment.Action>
                <Comment.Action>
                  <Icon name='trash' color="red" onClick={() => onDeleteComment(comment)} />
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>))}
      </Comment.Group>
    </>
  )
}

export default Comments