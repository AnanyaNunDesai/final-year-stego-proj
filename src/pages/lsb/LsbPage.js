import axios from "axios";
import { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TitleBar from "../../components/TitleBar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Collapse } from "@mui/material";

import "./LsbPage.css";

const IS_LOADING = "IS_LOADING";
const API_ENDPOINT = "http://127.0.0.1:5000";

function LsbPage() {
  const [encodeCoverImg, setEncodeCoverImg] = useState(null);
  const [encodeSecretImg, setEncodeSecretImg] = useState(null);
  const [encodeNumBits, setEncodeNumBits] = useState(0);
  const [stegoLink, setStegoLink] = useState(null);

  const [stegoImg, setStegoImg] = useState(null);
  const [decodeNumBits, setDecodeNumBits] = useState(0);
  const [decodeSecretLink, setDecodeSecretLink] = useState(null);

  const [similarity, setSimilarity] = useState(null);
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);

  const [imageForBinary, setImageForBinary] = useState(null);
  const [binaryProcessed, setBinaryProcessed] = useState(false);

  const [open, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  return (
    <div>
      <TitleBar canGoBack={true} />
      {showStatusBannerMsg(error, successMsg, open, setOpen)}
      <div className="appbar-content">
        <Typography variant="h2">LSB Steganography</Typography>
        <br />
        <div>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 700,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Least-Significant Bit (LSB) Steganography is an image-manipulation
            technique that is specially designed to encode bit information
            within an image, called the cover image. Images are composed of
            pixels containing RGB values that can even be modified to hold bit
            data from other images' pixel data. By removing the "least
            significant" bits from the cover image and replacing them with the
            most significant ones from the image to hide, the cover image can
            remain intact.
          </Typography>
          <div>
            <Stack
              direction="row"
              alignItems="flex-start"
              spacing={7}
              divider={<Divider orientation="vertical" flexItem />}
              sx={{
                margin: 10,
                marginTop: 12,
                position: "absolute",
              }}
            >
              <div className="algo-section">
                <Typography variant="h5">Encode</Typography>
                <br />
                <form
                  onSubmit={async (e) =>
                    await createStegoImage(
                      e,
                      setStegoLink,
                      setError,
                      setSuccessMsg,
                      setOpen,
                      [encodeCoverImg, encodeSecretImg],
                      encodeNumBits
                    )
                  }
                >
                  <Stack direction="row" spacing={20}>
                    {createImageButton("Upload Cover Image", setEncodeCoverImg)}
                    <Typography>
                      {encodeCoverImg ? encodeCoverImg.name : "N/A"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={20}>
                    {createImageButton(
                      "Upload Secret Image",
                      setEncodeSecretImg
                    )}
                    <Typography>
                      {encodeSecretImg ? encodeSecretImg.name : "N/A"}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={25}
                    minWidth={350}
                    marginBottom={5}
                  >
                    <Typography variant="h6">Bits to Encode</Typography>
                    {createNumberField(
                      "Bits to Encode",
                      encodeNumBits,
                      setEncodeNumBits
                    )}
                  </Stack>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={stegoLink === IS_LOADING}
                    size="small"
                  >
                    Encode!
                  </LoadingButton>
                </form>
                <br />
              </div>
              <div className="algo-section">
                <Typography variant="h5">Decode</Typography>
                <br />
                <form
                  onSubmit={async (e) =>
                    await createDecodedImage(
                      e,
                      setDecodeSecretLink,
                      setError,
                      setSuccessMsg,
                      setOpen,
                      stegoImg,
                      decodeNumBits
                    )
                  }
                >
                  <Stack direction="row" spacing={10}>
                    {createImageButton("Upload Stego Image", setStegoImg)}
                    <Typography>{stegoImg ? stegoImg.name : "N/A"}</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={15}
                    minWidth={350}
                    marginBottom={5}
                  >
                    <Typography variant="h6">Bits to Decode</Typography>
                    {createNumberField(
                      "Bits to Decode",
                      decodeNumBits,
                      setDecodeNumBits
                    )}
                  </Stack>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={decodeSecretLink === IS_LOADING}
                    size="small"
                  >
                    Decode!
                  </LoadingButton>
                </form>
                <br />
              </div>
              <div className="algo-section">
                <Typography variant="h5">Compare Quality</Typography>
                <br />
                <form
                  onSubmit={async (e) =>
                    await calculateImageSimilarity(
                      e,
                      setSimilarity,
                      setError,
                      setSuccessMsg,
                      setOpen,
                      [firstImage, secondImage]
                    )
                  }
                >
                  <Stack direction="row" spacing={10}>
                    {createImageButton("Upload First Image", setFirstImage)}
                    <Typography>
                      {firstImage ? firstImage.name : "N/A"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={10}>
                    {createImageButton("Upload Second Image", setSecondImage)}
                    <Typography>
                      {secondImage ? secondImage.name : "N/A"}
                    </Typography>
                  </Stack>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={similarity === IS_LOADING}
                    size="small"
                  >
                    Compare!
                  </LoadingButton>
                </form>
                <br />
              </div>
              <div className="algo-section">
                <Typography variant="h5" marginBottom={3}>
                  Get Binary
                </Typography>
                <form
                  onSubmit={async (e) =>
                    await getBinary(
                      e,
                      setBinaryProcessed,
                      setError,
                      setSuccessMsg,
                      setOpen,
                      imageForBinary
                    )
                  }
                >
                  <Stack direction="row" spacing={10}>
                    {createImageButton("Upload Image", setImageForBinary)}
                    <Typography>
                      {imageForBinary ? imageForBinary.name : "N/A"}
                    </Typography>
                  </Stack>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={binaryProcessed === IS_LOADING}
                    size="small"
                  >
                    Get Binary!
                  </LoadingButton>
                </form>
              </div>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

function showStatusBannerMsg(error, successMsg, open, setOpen) {
  if (error) {
    return (
      <Collapse in={open}>
        <Alert severity="error" onClose={() => setOpen(false)}>
          {error}
        </Alert>
      </Collapse>
    );
  } else if (successMsg) {
    return (
      <Collapse in={open}>
        <Alert severity="success" onClose={() => setOpen(false)}>
          {successMsg}
        </Alert>
      </Collapse>
    );
  } else {
    return <></>;
  }
}

function createImageButton(buttonText, setValue) {
  const buttonId = buttonText.replace(" ", "-");

  return (
    <label htmlFor={buttonId}>
      <input
        accept="image/*"
        id={buttonId}
        multiple
        type="file"
        style={{ display: "none" }}
        onInput={(e) => setValue(e.target.files[0])}
      />
      <Button
        variant="contained"
        component="span"
        sx={{
          marginBottom: "50%",
        }}
        size="small"
      >
        {buttonText}
      </Button>
    </label>
  );
}

function createNumberField(fieldName, value, setValue) {
  const fieldId = fieldName.replace(" ", "-");

  return (
    <div>
      <TextField
        id={fieldId}
        label={fieldName}
        type="number"
        InputProps={{ inputProps: { min: "0", max: "4", step: "1" } }}
        variant="outlined"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
}

async function createStegoImage(
  e,
  setLink,
  setError,
  setSuccessMsg,
  setOpen,
  images,
  lsb
) {
  try {
    e.preventDefault();

    setLink(IS_LOADING);

    const formData = new FormData();
    formData.append("cover", images[0]);
    formData.append("secret", images[1]);
    formData.append("lsb", lsb);

    const response = await axios.post(API_ENDPOINT + "/lsb_encode", formData);
    const stats = response.data;

    setError(null);
    setSuccessMsg(
      `Finished LSB encode in ${stats.time.toFixed(3)} sec and allocated ${
        stats.memory
      } bytes!`
    );
    setLink(response.data.file);
  } catch (e) {
    console.log(e.response?.data ?? "The server might not be running.");
    setError(e.response?.data ?? "The server might not be running.");
    setSuccessMsg(null);
    setOpen(true);
    setLink(null);
  }
}

async function createDecodedImage(
  e,
  setLink,
  setError,
  setSuccessMsg,
  setOpen,
  image,
  lsb
) {
  try {
    e.preventDefault();

    setLink(IS_LOADING);

    const formData = new FormData();
    formData.append("stego", image);
    formData.append("lsb", lsb);

    const response = await axios.post(API_ENDPOINT + "/lsb_decode", formData);
    const stats = response.data;

    setError(null);
    setSuccessMsg(
      `Finished LSB decode in ${stats.time.toFixed(3)} sec and allocated ${
        stats.memory
      } bytes!`
    );
    setLink(response.data.file);
  } catch (e) {
    console.log(e.response?.data ?? "The server might not be running.");
    setError(e.response?.data ?? "The server might not be running.");
    setSuccessMsg(null);
    setOpen(true);
    setLink(null);
  }
}

async function calculateImageSimilarity(
  e,
  setSimilarity,
  setError,
  setSuccessMsg,
  setOpen,
  images
) {
  try {
    e.preventDefault();

    setSimilarity(IS_LOADING);

    const formData = new FormData();
    formData.append("img1", images[0]);
    formData.append("img2", images[1]);

    const response = await axios.post(
      API_ENDPOINT + "/compare_quality",
      formData
    );
    setError(null);
    setSimilarity(response.data.quality);
    setSuccessMsg(`These images have a ${response.data.quality}% match!`);
    setOpen(true);
  } catch (e) {
    console.log(e.response?.data ?? "The server might not be running.");
    setError(e.response?.data ?? "The server might not be running.");
    setSuccessMsg(null);
    setOpen(true);
    setSimilarity(null);
  }
}

async function getBinary(
  e,
  setBinaryProcessed,
  setError,
  setSuccessMsg,
  setOpen,
  imageForBinary
) {
  e.preventDefault();

  try {
    setBinaryProcessed(IS_LOADING);

    const formData = new FormData();
    formData.append("img", imageForBinary);
    formData.append("output_folder", "lsb");

    await axios.post(API_ENDPOINT + "/get_binary", formData);
    setError(null);
    setBinaryProcessed(true);
    setSuccessMsg(`Successfully wrote binary data to output folder!`);
    setOpen(true);
  } catch (e) {
    console.log(e.response?.data ?? "The server might not be running.");
    setError(e.response?.data ?? "The server might not be running.");
    setSuccessMsg(null);
    setOpen(true);
    setBinaryProcessed(false);
  }
}

export default LsbPage;
