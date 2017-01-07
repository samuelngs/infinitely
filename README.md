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

## License ##

This project is distributed under the GNU v3 license found in the [LICENSE](./LICENSE)
file.

~~~
The GNU General Public License, Version 3, 29 June 2007 (GPLv3)

Copyright (c) 2015 Samuel <sam@infinitely.io>

This program is free software: you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
more details.

You should have received a copy of the GNU General Public License along with
this program.  If not, see <http://www.gnu.org/licenses/>.
~~~
