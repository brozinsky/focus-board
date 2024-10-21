import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/Dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/inputs/Input";
import Button from "@/components/ui/buttons/Button";
import axios from "axios";

const DialogAddSpotifyPlaylist = ({ setPlaylists }) => {
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newPlaylistUrl, setNewPlaylistUrl] = useState<string>("");

  const handleAddPlaylist = async () => {
    if (!newPlaylistUrl) {
      setError("Please enter a Spotify playlist URL.");
      return;
    }

    const playlistIdMatch = newPlaylistUrl.match(
      /https:\/\/open.spotify.com\/playlist\/([a-zA-Z0-9]+)/
    );

    if (!playlistIdMatch) {
      setError("Please enter a valid Spotify playlist URL.");
      return;
    }

    const playlistId = playlistIdMatch[1];

    try {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
      const authString = btoa(`${clientId}:${clientSecret}`);

      const tokenResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${authString}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = tokenResponse.data.access_token;

      const playlistResponse = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const newPlaylist = playlistResponse.data;
      setPlaylists((prevPlaylists) => [newPlaylist, ...prevPlaylists]);
      setNewPlaylistUrl("");
      setError(null);
      setIsDialogOpen(false);
    } catch (err) {
      setError("Failed to add the playlist. Please try again.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Button className="!w-fit" size="sm">
          + Add playlist
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">
            Add Custom Spotify Playlist
          </DialogTitle>
          <DialogDescription>
            Enter the URL of the Spotify playlist you want to add.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Input
            className="w-full p-2 border rounded"
            placeholder="Enter Spotify playlist URL"
            type="text"
            value={newPlaylistUrl}
            onChange={(e) => setNewPlaylistUrl(e.target.value)}
            required
          />
        </div>
        <DialogFooter>
          <div className="w-full flex items-center gap-2 justify-between">
            {error ? (
              <div className="text-red-500 text-sm">{error}</div>
            ) : (
              <div></div>
            )}
            <div className="flex gap-2">
              <Button
                className="!w-24"
                variant="primary"
                onClick={handleAddPlaylist}
              >
                Add
              </Button>
              <DialogClose asChild>
                <Button className="!w-24" variant="neutral">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddSpotifyPlaylist;
