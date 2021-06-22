export function setComments(comments) {
  return {
    type: 'SET_COMMENTS',
    comments
  }
}

export function addComment(comment) {
  return {
    type: 'ADD_COMMENT',
    comment
  }
}

export function editComment(comment) {
  return {
    type: 'EDIT_COMMENT',
    comment
  }
}

export function deleteComment(comment) {
  return {
    type: 'DELETE_COMMENT',
    comment
  }
}