# infinitely 2.0
A re-brand infinitely website

# Resource

### Optimizing Image for the web
```
$ jpegoptim --size=250k {image_file}
```

### Optimizing Video for the Web

```
$ ffmpeg -i {video_file} -vcodec libx264 -crf 20 output.mp4
```

### Screen cover for video
```
$ ffmpeg -i {video_file} -ss 00:00:00.000 -vframes 1 out.png
```

### Convert PNG to JPEG
```
$ convert {png_file} {jpg_file}
```

### Blur screen cover
```
$ convert {image_file} -channel RGBA -blur 0x20 {output_file}
```

## License ##

This project is distributed under the GNU Affero v3 license found in the [LICENSE](./LICENSE) file.

