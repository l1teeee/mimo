import type { InkDrawing } from "@/lib/ink-geometry";

export const emblem: InkDrawing = {
  id: "emblem",
  width: 320,
  height: 200,
  jitter: 1,
  nodes: [
    {
      kind: "stroke",
      id: "ring",
      tone: "ink",
      width: 5,
      closed: true,
      anchors: [
        [160.6, 9.5], [235.5, 22.8], [283.4, 47.9], [305.3, 77.2], [309.5, 100.6], [304.4, 123.9], [282.4, 152.2],
        [234.4, 177.3], [159.5, 190.5], [84.5, 178.5], [36.6, 152.1], [14.7, 122.8], [10.6, 99.5], [15.6, 76.2],
        [37.7, 47.8], [85.6, 21.5],
      ],
    },
    {
      kind: "group",
      id: "big-bunny",
      pivot: [130, 152],
      motion: { kind: "hop", period: 6.4, delay: 1.5 },
      children: [
        {
          kind: "outline",
          id: "big-body",
          tone: "ink",
          anchors: [
            [128, 152.5], [150, 152], [165, 148], [171.5, 139], [169, 126], [160, 114], [146, 106], [130, 104],
            [115, 108], [103, 118], [95, 130], [92.5, 142], [98, 150],
          ],
        },
        {
          kind: "group",
          id: "big-tail",
          pivot: [96, 138],
          motion: { kind: "wiggle", period: 3.8, delay: 0.6 },
          children: [
            {
              kind: "outline",
              id: "big-tail-puff",
              tone: "ink",
              anchors: [
                [93, 130], [98.7, 132.3], [101, 138], [98.7, 143.7], [93, 146], [87.3, 143.7], [85, 138], [87.3, 132.3],
              ],
            },
          ],
        },
        {
          kind: "group",
          id: "big-head",
          pivot: [150, 108],
          motion: { kind: "tilt", period: 7.2, delay: 3 },
          children: [
            {
              kind: "outline",
              id: "big-head-shape",
              tone: "ink",
              anchors: [
                [156, 74], [165.5, 76.5], [172.5, 82.5], [177, 90], [179, 96], [178, 102], [172, 106.5], [164, 109.5],
                [154, 110.5], [145, 106], [139.5, 98], [138.5, 89], [142, 80], [148.5, 75.5],
              ],
            },
            {
              kind: "group",
              id: "big-ears",
              pivot: [156, 78],
              motion: { kind: "flick", period: 4.6, delay: 2.2 },
              children: [
                {
                  kind: "outline",
                  id: "big-ear-back",
                  tone: "ink",
                  anchors: [
                    [146, 79], [143.5, 68], [141.5, 55], [141, 44], [145, 37], [150, 40.5], [151.5, 52], [153, 66],
                    [155, 79],
                  ],
                },
                {
                  kind: "outline",
                  id: "big-ear-front",
                  tone: "ink",
                  anchors: [
                    [158, 79], [158.5, 66], [160, 52], [161.5, 43], [166, 37.5], [170, 41.5], [170, 54], [169, 67],
                    [167, 79],
                  ],
                },
                {
                  kind: "outline",
                  id: "big-ear-back-inner",
                  tone: "paper",
                  anchors: [[147.5, 72], [146, 62], [145, 52], [145.5, 46], [147.5, 43.5], [148.5, 48], [149, 58], [150, 69]],
                },
                {
                  kind: "outline",
                  id: "big-ear-front-inner",
                  tone: "paper",
                  anchors: [[162, 72], [162.5, 60], [163.5, 50], [165, 45], [167, 44], [167.5, 50], [167, 60], [166, 70]],
                },
              ],
            },
            {
              kind: "group",
              id: "big-eye",
              pivot: [163, 89],
              motion: { kind: "blink", period: 3.9, delay: 1 },
              children: [
                { kind: "spot", id: "big-eye-spot", tone: "paper", center: [163, 89], radii: [2.6, 3], rotation: 0 },
              ],
            },
            { kind: "spot", id: "big-nose", tone: "paper", center: [177.5, 95.5], radii: [1.8, 1.5], rotation: 0 },
            {
              kind: "stroke",
              id: "big-mouth",
              tone: "paper",
              width: 1.4,
              anchors: [[177, 98.5], [176, 101], [172.5, 102.3]],
            },
          ],
        },
        {
          kind: "stroke",
          id: "big-front-paw",
          tone: "paper",
          width: 1.6,
          anchors: [[152, 141], [156.5, 145], [162, 145.5]],
        },
        {
          kind: "stroke",
          id: "big-hind-foot",
          tone: "paper",
          width: 1.6,
          anchors: [[103, 138], [108, 146], [118, 149.5], [130, 149]],
        },
      ],
    },
    {
      kind: "stroke",
      id: "bunny-gap",
      tone: "paper",
      width: 4,
      anchors: [[180.5, 118], [172.7, 125.2], [170.3, 134], [172.7, 142.9], [179.1, 149.3], [184, 152.5]],
    },
    {
      kind: "group",
      id: "small-bunny",
      pivot: [225, 152],
      motion: { kind: "breathe", period: 3.2, delay: 0.5 },
      children: [
        {
          kind: "outline",
          id: "small-body",
          tone: "ink",
          anchors: [
            [196, 152.5], [224, 153], [246, 152.5], [253, 148], [257, 139], [255, 130], [249, 123], [238, 120],
            [224, 119.5], [210, 122], [200, 128], [194, 138], [193, 147],
          ],
        },
        {
          kind: "outline",
          id: "small-head",
          tone: "ink",
          anchors: [
            [188, 118.5], [195.8, 120.6], [201.5, 126.3], [203.5, 134], [201.5, 141.7], [195.8, 147.4], [188, 149.5],
            [180.2, 147.4], [174.5, 141.7], [172.5, 134], [174.5, 126.3], [180.2, 120.6],
          ],
        },
        {
          kind: "group",
          id: "small-ears",
          pivot: [198, 122],
          motion: { kind: "flick", period: 6.8, delay: 4 },
          children: [
            {
              kind: "outline",
              id: "small-ear-upper",
              tone: "ink",
              anchors: [
                [197, 118.5], [208.5, 112.5], [221, 106.5], [231.5, 102.5], [237, 104], [234.5, 109], [225, 114.3],
                [212, 120.5], [201, 126],
              ],
            },
            {
              kind: "outline",
              id: "small-ear-lower",
              tone: "ink",
              anchors: [
                [201.5, 123.7], [213.5, 119.5], [226.5, 114.7], [236, 111.5], [241.5, 113.5], [238.5, 118.5],
                [229.5, 123.3], [216.5, 128], [204.5, 132.3],
              ],
            },
            {
              kind: "outline",
              id: "small-ear-upper-inner",
              tone: "paper",
              anchors: [[202, 121], [212, 116.8], [222, 111.5], [231, 106.8], [233.5, 107.5], [225, 112.5], [213, 118.8], [204, 123.3]],
            },
            {
              kind: "outline",
              id: "small-ear-lower-inner",
              tone: "paper",
              anchors: [[208, 127], [218, 123], [229, 118.8], [236.5, 116.2], [237.5, 117.5], [230, 121.8], [219, 126.2], [209, 129.7]],
            },
          ],
        },
        {
          kind: "stroke",
          id: "small-eye",
          tone: "paper",
          width: 1.4,
          anchors: [[181, 131], [185, 133.8], [189, 131]],
        },
        { kind: "spot", id: "small-nose", tone: "paper", center: [177.5, 137], radii: [1.7, 1.4], rotation: 0 },
        {
          kind: "outline",
          id: "small-tail",
          tone: "ink",
          anchors: [
            [260, 135], [264.2, 136.8], [266, 141], [264.2, 145.2], [260, 147], [255.8, 145.2], [254, 141], [255.8, 136.8],
          ],
        },
      ],
    },
  ],
};
