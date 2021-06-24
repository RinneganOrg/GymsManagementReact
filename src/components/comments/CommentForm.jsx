import React, { useState, useEffect } from "react";
import { Form, Button, Rating } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment, editComment } from '../../store/actions/comments'

const CommentForm = ({ gymId, trainerId, courseId, mode, commentId, changeMode }) => {
  const commentToEdit = useSelector(state =>
    state.comments.comments.find(comment => comment.id === commentId))
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  useEffect(
    () => {
      if (commentToEdit) {
        setRating(commentToEdit.rating)
        setComment(commentToEdit.comment)
      }
    },
    [commentToEdit],
  );
  const dispatch = useDispatch()
  const changeComment = (event) => {
    setComment(event.target.value)
  }
  const handleRate = (event, { rating }) => {
    setRating(rating)
  }

  const submitComment = () => {
    if (mode === 'add') {
      let commentToAdd = {
        gymId,
        trainerId,
        courseId,
        userId: 1,
        comment,
        rating
      }
      dispatch(addComment(commentToAdd))
    } else if (mode === 'edit') {
      let commentToEdit = {
        id: commentId,
        gymId,
        trainerId,
        courseId,
        userId: 1,
        comment,
        rating
      }
      dispatch(editComment(commentToEdit))
      changeMode()
    }
    setComment('')
    setRating(0)
  }
  return (
    <Form>
      <Rating icon='star' rating={rating} maxRating={5} onRate={handleRate} />
      <Form.Field>
        <input value={comment} onChange={changeComment} />
      </Form.Field>
      <Button size='mini' primary onClick={submitComment} floated="right" >Save</Button>
      <br />
    </Form>
  )
}
export default CommentForm;