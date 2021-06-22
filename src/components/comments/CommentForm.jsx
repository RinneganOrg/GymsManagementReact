import React, { useState } from "react";
import { Form, Button, Rating } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { addComment } from '../../store/actions/comments'
const CommentForm = ({ gymId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch()

  const changeComment = (event) => {
    setComment(event.target.value)
  }
  const handleRate = (event, { rating }) => {
    setRating(rating)
  }

  const onAddComment = () => {
    let result = {
      gymId,
      trainerId: null,
      userId: 1,
      comment,
      rating
    }
    dispatch(addComment(result))
    setComment('')
    setRating(0)
  }
  return (
    <Form>
      <Form.Field>
        <input value={comment} onChange={changeComment} />
      </Form.Field>
      <Rating icon='star' rating={rating} maxRating={5} onRate={handleRate} />
      <Button onClick={onAddComment}>Add comment</Button>
    </Form>
  )
}
export default CommentForm;