import React from 'react'
import CommentForm from './CommentForm'
import { Comment, Header, Rating } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

const CommentExampleComment = (props) => {
  const selectComments = state => state.comments
  const { comments } = useSelector(selectComments)
  const filterComments = (comment) => {
      return comment.gymId === props.gymId
  }
  return (
    <>
    <Comment.Group>
      <Header as='h3' dividing>
        Comments
    </Header>
      {comments.filter(comment => filterComments(comment)).map((comment) => (
        <Comment key={comment.id}>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Matt</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>{comment.comment}</Comment.Text>
            <Rating icon='star' defaultRating={comment.rating} maxRating={5} disabled/>
          </Comment.Content>
        </Comment>))}
    </Comment.Group>
    <CommentForm gymId={ props.gymId }/>
    </>
  )
}

export default CommentExampleComment