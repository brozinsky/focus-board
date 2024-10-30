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
import { useSpotifyStore } from "@/stores/zustand/useSpotifyStore";

const DialogAddYoutubePlaylist = () => {
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newPlaylistUrl, setNewPlaylistUrl] = useState<string>("");

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

export default DialogAddYoutubePlaylist;
