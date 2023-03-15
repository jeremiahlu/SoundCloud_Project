"use strict";

const { Album, User } = require("../models");

const usersAlbum = [
  {
    userId: 4,
    albumId: 1,
    title: "DAMN.",
    songTitle: [
      {
        userId: 4,
        title: "BLOOD.",
        url: "https://soundstrata.s3.amazonaws.com/Kendrick+Lamar+-+Blood+(Lyrics)+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
        genre: "Rap",
      },
      {
        userId: 4,
        title: "DNA.",
        url: "https://soundstrata.s3.amazonaws.com/Kendrick+Lamar+-+DNA+(Lyrics)+(2).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
        genre: "Rap",
      },
      {
        userId: 4,
        title: "YAH.",
        url: "https://soundstrata.s3.amazonaws.com/YAH+-+Kendrick+Lamar+(DAMN)+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
        genre: "Rap",
      },
      {
        userId: 4,
        title: "ELEMENT.",
        url: "https://soundstrata.s3.amazonaws.com/Kendrick+Lamar+++ELEMENT.+OG+(FULL+SONG+RECREATION)+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
        genre: "Rap",
      },
      {
        userId: 4,
        title: "FEEL.",
        url: "https://soundstrata.s3.amazonaws.com/Kendrick+Lamar+++ELEMENT.+OG+(FULL+SONG+RECREATION)+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
        genre: "Rap",
      },
      // {
      //   userId: 4,
      //   title: "LOYALTY.",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 4,
      //   title: "PRIDE.",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
      //   genre: "Rap",
      // },
      {
        userId: 4,
        title: "HUMBLE.",
        url: "https://soundstrata.s3.amazonaws.com/Kendrick+Lamar+_HUMBLE._+(AUDIO)+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
        genre: "Rap",
      },
      // {
      //   userId: 4,
      //   title: "LUST.",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 4,
      //   title: "LOVE.",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 4,
      //   title: "XXX.",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 4,
      //   title: "FEAR.",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 4,
      //   title: "GOD.",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 4,
      //   title: "DUCKWORTH.",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-000657703867-cm4g8h-t200x200.jpg",
      //   genre: "Rap",
      // },
    ],
  },
  {
    userId: 5,
    albumId: 2,
    title: "Oops!...I Did It Again",
    songTitle: [
      {
        userId: 5,
        title: "Oops!...I Did It Again",
        url: "https://soundstrata.s3.amazonaws.com/Britney+Spears+-+Oops!...+I+Did+It+Again+(Audio)+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
        genre: "Pop",
      },
      {
        userId: 5,
        title: "Stronger",
        url: "https://soundstrata.s3.amazonaws.com/Britney+Spears+-+Stronger+(Audio)+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
        genre: "Pop",
      },
      // {
      //   userId: 5,
      //   title: 'Don"t Go Knockin on My Door',
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
      //   genre: "Pop",
      // },
      // {
      //   userId: 5,
      //   title: '(I Can"t Get No) Satisfaction',
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
      //   genre: "Pop",
      // },
      // {
      //   userId: 5,
      //   title: 'Don"t Let Me Be the Last to Know',
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
      //   genre: "Pop",
      // },
      // {
      //   userId: 5,
      //   title: "What U See(Is What U Get)",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
      //   genre: "Pop",
      // },
      {
        userId: 5,
        title: "Lucky",
        url: "https://soundstrata.s3.amazonaws.com/Britney+Spears+-+Lucky+(Audio)+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
        genre: "Pop",
      },
      // {
      //   userId: 5,
      //   title: "One Kiss From You",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
      //   genre: "Pop",
      // },
      // {
      //   userId: 5,
      //   title: "Where Are You Now",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
      //   genre: "Pop",
      // },
      // {
      //   userId: 5,
      //   title: 'Can"t Make You Love Me',
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
      //   genre: "Pop",
      // },
      // {
      //   userId: 5,
      //   title: "When Your Eyes Say It",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
      //   genre: "Pop",
      // },
      {
        userId: 5,
        title: "Dear Diary",
        url: "https://soundstrata.s3.amazonaws.com/Britney+Spears+-+Dear+Diary+With+Lyrics+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-kMPmubNFl8BdNunY-8B4Tog-t200x200.jpg",
        genre: "Pop",
      },
    ],
  },
  {
    userId: 6,
    albumId: 3,
    title: "Fearless",
    songTitle: [
      // {
      //   userId: 6,
      //   title: "Fearless",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
      //   genre: "Pop",
      // },
      // {
      //   userId: 6,
      //   title: "Fifteen",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
      //   genre: "Pop",
      // },
      {
        userId: 6,
        title: "Love Story",
        url: "https://soundstrata.s3.amazonaws.com/Taylor+Swift+-+Love+Story+(Lyrics)+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
        genre: "Pop",
      },
      // {
      //   userId: 6,
      //   title: "Hey Stephen",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
      //   genre: "Pop",
      // },
      // {
      //   userId: 6,
      //   title: "White Horse",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
      //   genre: "Pop",
      // },
      {
        userId: 6,
        title: "You Belong With Me",
        url: "https://soundstrata.s3.amazonaws.com/You+Belong+With+Me+(Taylor's+Version)+(Audio)+-+Taylor+Swift+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
        genre: "Pop",
      },
      // {
      //   userId: 6,
      //   title: "Breathe",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
      //   genre: "Pop",
      // },
      // {
      //   userId: 6,
      //   title: "Tell Me Why",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
      //   genre: "Pop",
      // },
      // {
      //   userId: 6,
      //   title: 'You"re Not Sorry',
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
      //   genre: "Pop",
      // },
      {
        userId: 6,
        title: "The Way I Loved You",
        url: "https://soundstrata.s3.amazonaws.com/The+Way+I+Loved+You+(Taylor's+Version)+(Audio)+-+Taylor+Swift+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
        genre: "Pop",
      },
      {
        userId: 6,
        title: "Forever & Always",
        url: "https://soundstrata.s3.amazonaws.com/FOREVER+%26+ALWAYS+-+Taylor+Swift+(Taylor's+Version)+(Lyrics)+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
        genre: "Pop",
      },
      // {
      //   userId: 6,
      //   title: "The Best Day",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
      //   genre: "Pop",
      // },
      // {
      //   userId: 6,
      //   title: "Change",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-8f4be5d6-b31e-4d35-800b-976d8edd39ab-0-t200x200.jpg",
      //   genre: "Pop",
      // },
    ],
  },
  {
    userId: 7,
    albumId: 4,
    title: 'It Was Good Until It Wasn"t',
    songTitle: [
      {
        userId: 7,
        title: "Toxic.",
        url: "https://soundstrata.s3.amazonaws.com/toxic.mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
        genre: "R&B",
      },
      {
        userId: 7,
        title: "Can I",
        url: "https://soundstrata.s3.amazonaws.com/Can+I+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
        genre: "R&B",
      },
      // {
      //   userId: 7,
      //   title: "Bad News",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
      // {
      //   userId: 7,
      //   title: "Real Hot Girl Skit",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
      // {
      //   userId: 7,
      //   title: "Water",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
      {
        userId: 7,
        title: "Change Your Life",
        url: "https://soundstrata.s3.amazonaws.com/Kehlani+-+Change+Your+Life+(Lyrics)+(1).mp3",
        previewImage:
          "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
        genre: "R&B",
      },
      // {
      //   userId: 7,
      //   title: "Belong To The Streets Skit",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
      // {
      //   userId: 7,
      //   title: "Everybody Business",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
      // {
      //   userId: 7,
      //   title: "Hate The Club",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
      // {
      //   userId: 7,
      //   title: "Serial Lover",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
      // {
      //   userId: 7,
      //   title: "F&MU",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
      // {
      //   userId: 7,
      //   title: "Can You Blame Me",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
      // {
      //   userId: 7,
      //   title: "Grieving",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
      // {
      //   userId: 7,
      //   title: "Open(Passionate)",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
      // {
      //   userId: 7,
      //   title: "Lexi's Outro",
      //   url: "audio url",
      //   previewImage:
      //     "https://i1.sndcdn.com/artworks-KG0OzrdhhfKmZzwW-DPIssg-t200x200.jpg",
      //   genre: "R&B",
      // },
    ],
  },
  {
    userId: 8,
    albumId: 5,
    title: "The College Dropout",
    songTitle: [
      // {
      //   userId: 8,
      //   title: "Graduation Day",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 8,
      //   title: "Never Let Me Down",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 8,
      //   title: "Two Words",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 8,
      //   title: "Family Business",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 8,
      //   title: "I'll Fly Away",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 8,
      //   title: "Spaceship",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 8,
      //   title: "Jesus Walks",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 8,
      //   title: "Get Em High",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
      //   genre: "Rap",
      // },
      {
        userId: 8,
        title: "Through The Wire",
        url: "https://soundstrata.s3.amazonaws.com/Kanye+West+-+Through+the+Wire+(Lyrics)+(1).mp3",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
        genre: "Rap",
      },
      {
        userId: 8,
        title: "All Falls Down",
        url: "https://soundstrata.s3.amazonaws.com/Kanye+West+-+All+Falls+Down+(High+Quality)+(1).mp3",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
        genre: "Rap",
      },
      {
        userId: 8,
        title: "Workout Plan",
        url: "https://soundstrata.s3.amazonaws.com/Kanye+West+-+The+New+Workout+Plan+(High+Quality)+(1).mp3",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
        genre: "Rap",
      },
      // {
      //   userId: 8,
      //   title: "Breathe In Breathe Out",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
      //   genre: "Rap",
      // },
      {
        userId: 8,
        title: "Slow Jamz",
        url: "https://soundstrata.s3.amazonaws.com/Kanye+West+-+Slow+Jamz+(High+Quality)+(1).mp3",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
        genre: "Rap",
      },
    ],
  },
  {
    userId: 9,
    albumId: 6,
    title: "Man On The Moon: The End of Day",
    songTitle: [
      {
        userId: 9,
        title: "Pursuit Of Happiness (Nightmare)",
        url: "https://soundstrata.s3.amazonaws.com/Kid+Cudi+-+Pursuit+Of+Happiness+ft.+MGMT+(+8D+Audio+)+(1).mp3",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
        genre: "Rap",
      },
      // {
      //   userId: 9,
      //   title: "My World",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 9,
      //   title: "T.G.I.F",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 9,
      //   title: "Man On The Moon",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
      //   genre: "Rap",
      // },
      {
        userId: 9,
        title: "Solo Dolo",
        url: "https://soundstrata.s3.amazonaws.com/Solo+Dolo+(nightmare)+(1).mp3",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
        genre: "Rap",
      },
      // {
      //   userId: 9,
      //   title: "Alive",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 9,
      //   title: "Soundtrack 2 My Life",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 9,
      //   title: "Cudi Zone",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
      //   genre: "Rap",
      // },
      {
        userId: 9,
        title: "Day 'N' Nite",
        url: "https://soundstrata.s3.amazonaws.com/Day+n+Nite+(1).mp3",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
        genre: "Rap",
      },
      // {
      //   userId: 9,
      //   title: "Is There Any Love",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 9,
      //   title: "Hyyerr",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 9,
      //   title: "In My Dreams",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
      //   genre: "Rap",
      // },
      // {
      //   userId: 9,
      //   title: "Simple As...",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg",
      //   genre: "Rap",
      // },
    ],
  },
  {
    userId: 10,
    albumId: 7,
    title: "Dangerous Woman",
    songTitle: [
      // {
      //   userId: 10,
      //   title: "Leave Me Lonely",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
      //   genre: "Pop",
      // },
      {
        userId: 10,
        title: "Side to Side",
        url: "https://soundstrata.s3.amazonaws.com/Ariana+Grande+-+Side+To+Side+(Lyrics)+ft.+Nicki+Minaj+(1).mp3",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
        genre: "Pop",
      },
      // {
      //   userId: 10,
      //   title: "Into You",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
      //   genre: "Pop",
      // },
      // {
      //   userId: 10,
      //   title: "Greedy",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
      //   genre: "Pop",
      // },
      // {
      //   userId: 10,
      //   title: "Thinking Bout You",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
      //   genre: "Pop",
      // },
      {
        userId: 10,
        title: "Let Me Love You",
        url: "https://soundstrata.s3.amazonaws.com/Ariana+Grande+-+Let+Me+Love+You+(Audio)+ft.+Lil+Wayne+(1).mp3",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
        genre: "Pop",
      },
      // {
      //   userId: 10,
      //   title: "Bad Decisions",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
      //   genre: "Pop",
      // },
      // {
      //   userId: 10,
      //   title: "Be Alright",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
      //   genre: "Pop",
      // },
      {
        userId: 10,
        title: "Dangerous Woman",
        url: "https://soundstrata.s3.amazonaws.com/Ariana+Grande+-+Dangerous+Woman+(Lyrics)+(1).mp3",
        previewImage:
          "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
        genre: "Pop",
      },
      // {
      //   userId: 10,
      //   title: "Everyday",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
      //   genre: "Pop",
      // },
      // {
      //   userId: 10,
      //   title: "Moonlight",
      //   url: "audio url",
      //   previewImage:
      //     "https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png",
      //   genre: "Pop",
      // },
    ],
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let albumIdx = 0; albumIdx < usersAlbum.length; albumIdx++) {
      const { userId, albumId, title, songTitle } = usersAlbum[albumIdx];
      const album = await Album.findOne({ where: { title } });

      for (let songIdx = 0; songIdx < songTitle.length; songIdx++) {
        const song = songTitle[songIdx];
        await album.createSong(song);
      }
    }
  },
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let albumIdx = 0; albumIdx < usersAlbums.length; albumIdx++) {
      const { userId, albumId, title, songTitle } = usersAlbum[albumIdx];
      const album = await Album.findOne({ where: { title } });

      for (let songIdx = 0; songIdx < songTitle.length; songIdx++) {
        const song = songTitle[songIdx];
        await album.destroy({ where: song });
      }
    }
  },
};
