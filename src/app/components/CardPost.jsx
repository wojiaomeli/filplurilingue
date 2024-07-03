import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function CardPost({ post }) {
  return (
    <Card sx={{ maxWidth: 330, margin: '18px' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/path/to/your/image.jpg" // Vous pouvez utiliser une image par défaut ou dynamique si disponible dans les données du post
        title={post.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.contenent && post.contenent.length > 0 
            ? post.contenent[0].children[0].text 
            : "No content available."}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/Post/${post.slug}`}>
          <Button size="small">Lire</Button>
        </Link>
        <Button size="small">Partager</Button>
      </CardActions>
    </Card>
  );
}
