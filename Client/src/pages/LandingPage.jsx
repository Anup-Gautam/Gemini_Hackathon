import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  styled,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.REACT_APP_GEMINI_API_KEY);

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  // Function to convert file to base64
  const fileToGenerativePart = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          inlineData: {
            data: reader.result.split(",")[1], // Remove "data:<mime-type>;base64," prefix
            mimeType: file.type,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const analyzeImage = async (file) => {
    try {
      setLoading(true);

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Prepare the image for Gemini
      const imagePart = await fileToGenerativePart(file);

      // Get the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      // Analyze the image
      const result = await model.generateContent([
        "Analyze this image and identify recyclable items. For each item, specify its material type and recycling category. Format the response as a structured list.",
        imagePart,
      ]);
      const response = await result.response;
      setAnalysis(response.text());
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysis("Error analyzing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await analyzeImage(file);
    }
  };

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
                  disabled={loading}
                  sx={{
                    mt: 2,
                    mb: 2,
                    mr: 2,
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
                  {loading ? "Analyzing..." : "Upload Image"}
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

          {/* Analysis Results Section */}
          {(loading || analysis || imagePreview) && (
            <Card sx={{ mb: 6, p: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Analysis Results
                </Typography>

                {imagePreview && (
                  <Box sx={{ mb: 3, maxWidth: "300px", margin: "0 auto" }}>
                    <img
                      src={imagePreview}
                      alt="Uploaded"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                )}

                {loading && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", my: 3 }}
                  >
                    <CircularProgress />
                  </Box>
                )}

                {analysis && !loading && (
                  <Typography
                    variant="body1"
                    component="pre"
                    sx={{
                      whiteSpace: "pre-wrap",
                      bgcolor: "grey.50",
                      p: 2,
                      borderRadius: 1,
                    }}
                  >
                    {analysis}
                  </Typography>
                )}
                <Button
                  variant="contained"
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
                  {" "}
                  Do a Simple Recycle
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 2,
                    ml: 2,
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
                  {" "}
                  Be Creative
                </Button>
              </CardContent>
            </Card>
          )}

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
