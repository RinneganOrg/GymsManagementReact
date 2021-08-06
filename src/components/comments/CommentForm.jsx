import React, { useState, useEffect } from "react";
import { Form, Button, Rating } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment, editComment } from '../../store/actions/comments'
import { useAuth } from '../../Utils/context';

const CommentForm = ({ gymId, trainerId, courseId, mode, commentId, changeMode }) => {
  const commentToEdit = useSelector(state =>
    state.comments.comments.find(comment => comment._id === commentId))
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
  let auth = useAuth();
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
        gymId: gymId ? gymId : null,
        trainerId: trainerId ? trainerId : null,
        courseId: courseId ? courseId : null,
        userId: auth._id,
        comment,
        rating
      }
      dispatch(addComment(commentToAdd))
    } else if (mode === 'edit') {
      let commentToEdit = {
        id: commentId,
        gymId: gymId ? gymId : null,
        trainerId: trainerId ? trainerId : null,
        courseId: courseId ? courseId : null,
        userId: auth._id,
        comment,
        rating
      }
      dispatch(editComment(
        `http://localhost:8000/comments/${commentId}`,
        commentToEdit))
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