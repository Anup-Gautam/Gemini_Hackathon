import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const LandingPage = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const GradientTypography = styled(Typography)(({ theme }) => ({
    background: "linear-gradient(45deg, #2E7D32 30%, #1565C0 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }));

  const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    transition: "box-shadow 0.3s",
    "&:hover": {
      boxShadow: theme.shadows[4],
    },
  }));

  const UploadCard = styled(Card)(({ theme }) => ({
    border: "2px dashed",
    borderColor: theme.palette.grey[300],
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(4),
  }));

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f7f0 0%, #e6f0f7 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ p: 4 }}>
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <GradientTypography variant="h2" component="h1" gutterBottom>
              Recycle Me
            </GradientTypography>
            <Typography variant="h5" color="text.secondary">
              Turn your waste into a better future
            </Typography>
          </Box>

          {/* Upload Section */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <UploadCard>
              <CardContent>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Upload your image to identify recyclable items
                </Typography>

                <Button
                  component="label"
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    mt: 2,
                    mb: 2,
                    borderRadius: 28,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    backgroundColor: "#2E7D32",
                    "&:hover": {
                      backgroundColor: "#1B5E20",
                    },
                  }}
                >
                  Upload Image
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Button>

                <Typography variant="caption" color="text.secondary">
                  Supported formats: JPG, PNG, GIF (max 10MB)
                </Typography>
              </CardContent>
            </UploadCard>
          </Box>

          {/* Features Section */}
          <Grid container spacing={3}>
            {[
              {
                title: "Instant Analysis",
                description: "Get immediate feedback on recyclable items",
              },
              {
                title: "Smart Detection",
                description: "AI-powered recognition of materials",
              },
              {
                title: "Eco Impact",
                description: "Track your recycling contribution",
              },
            ].map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <StyledCard>
                  <CardContent>
                    <Typography variant="h6" gutterBottom align="center">
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default LandingPage;
