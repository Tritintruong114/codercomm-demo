import { Avatar, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { createComment } from "./commentSlice";

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ postId, content }));
    setContent("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center">
        <Avatar src={user.avatarurl} alt={user.name} />
        <TextField
          fullWidth
          size="small"
          value={content}
          placeholder="write a comment"
          onChange={(e) => setContent(e.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !impotant`,
            },
          }}
        />
        <IconButton type="submit">
          <SendIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
    </form>
  );
};

export default CommentForm;
