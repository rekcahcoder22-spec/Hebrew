export const motionVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },
  stagger: {
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  },
  redLineReveal: {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  },
  easterEggReveal: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  },
} as const;

export const homeContent = {
  eyebrow: "HEBREW — CHAPTER 01",
  title: "ADORE",
  subtitle: "the moment before the storm",
  viLead:
    "Adore không phải tình yêu ngọt ngào. Đây là giai đoạn nguy hiểm nhất.",
  volumeLabel: "THE BROKEN — VOLUME I",
  manifestoQuote: "This is not a love song. This is the moment before.",
  products: [
    {
      chapter: "I — Basic Tee",
      name: "THE ENTRY",
      conceptLine: "The first step is never innocent.",
      copy: "Chiếc áo cho khoảnh khắc bạn bắt đầu\nkhông còn thuộc về ngày cũ nữa.",
      easterEgg: "adore (v.) — to love dangerously.",
    },
    {
      chapter: "II — Core Tee",
      name: "THE BIRTH",
      conceptLine: "Love arrives as a fracture.",
      copy: "Không có tiếng động lớn.\nChỉ là một vết nứt nhỏ\nmở ra cả một chương mới.",
      easterEgg: "you let them in.",
    },
    {
      chapter: "III — Heavy Tee",
      name: "THE INEVITABLE",
      conceptLine: "After this point, there is no reset.",
      copy: "Bạn vẫn là bạn,\nnhưng mọi thứ đã lệch đi một chút.\nĐủ để không thể quay lại.",
      easterEgg: "careful now. this is where it starts.",
    },
  ],
  visualDirection: {
    paletteLabel: "Palette",
    photography:
      "film grain, underexposed, close-up hands, red light one side, two people never facing each other",
    visualTone: [
      "quiet rooms, loud feelings",
      "sacred fabrics, ruined timing",
      "beauty found at impact",
    ],
  },
  closingQuote: "ADORE là Chapter đẹp nhất và dễ tổn thương nhất.",
  closingEyebrow: "Hebrew — The Broken — Vol. I",
} as const;

export const ourStoryContent = {
  title: "OUR STORY",
  subtitle: "ADORE — CHAPTER 01 OF THE BROKEN",
  chapter1: {
    number: "CHAPTER 01",
    title: "THE BEGINNING",
    body: "Hebrew ra đời không phải từ một ý tưởng kinh doanh. Nó ra đời từ một đêm — khi người sáng lập ngồi nhìn màn hình trắng và không biết mình đang cảm thấy gì. Không phải buồn. Không phải tức. Chỉ là một khoảng trống rất cụ thể — loại khoảng trống chỉ có thể hình thành khi ai đó từng chiếm đầy chỗ đó và ra đi. Câu hỏi đầu tiên không phải là: 'Tôi muốn làm gì?' Câu hỏi đầu tiên là: 'Tôi muốn mặc gì khi tôi cảm thấy thế này?' Và khi không tìm được câu trả lời trong bất kỳ tủ quần áo nào — Hebrew bắt đầu.",
  },
  chapter2: {
    number: "CHAPTER 02",
    title: "THE NAME",
    body: "Tiếng Hebrew là một trong những ngôn ngữ lâu đời nhất thế giới. Trong đó, có những từ không thể dịch — những từ chỉ tồn tại để diễn tả trạng thái mà ngôn ngữ thông thường không chạm được tới. Đó là những gì chúng tôi muốn làm với quần áo. Tạo ra những thứ diễn tả được điều bạn không nói được. Mặc vào người — và ai hiểu, sẽ hiểu.",
  },
  chapter3: {
    number: "CHAPTER 03",
    title: "THE BROKEN UNIVERSE",
    lead: "Clothes are the closest thing to skin that isn't skin. We make things for the parts of you that have no name.",
    chapters: [
      { name: "ADORE", note: "desire before damage" },
      { name: "ACHE", note: "the bruise after light" },
      { name: "ABSENCE", note: "what remains when echoes stop" },
    ],
  },
  chapter4: {
    number: "CHAPTER 04",
    title: "WHAT WE BELIEVE",
    beliefs: [
      {
        index: "01",
        title: "On Clothes",
        body: "Quần áo không phải để che. Quần áo là cách bạn nói với thế giới: đây là thứ tôi đang cảm thấy — và tôi không cần giải thích.",
      },
      {
        index: "02",
        title: "On Pain",
        body: "Chúng tôi không cố làm cho nỗi đau trở nên đẹp. Nỗi đau đã đẹp rồi. Chúng tôi chỉ dám nhìn thẳng vào nó.",
      },
      {
        index: "03",
        title: "On Who We Dress",
        body: "Những người đang ở giữa một chương nào đó của cuộc đời — chưa kết thúc, chưa bắt đầu. Chỉ đang đang.",
      },
    ],
  },
  closing: {
    line: "Mỗi chiếc áo là một trang. Bạn đang ở Chapter nào?",
    footer: "Hebrew | The Broken — Our Story | Vol. I",
    quote:
      "The Broken is not a story about falling apart. It is a story about what you find when you look inside the cracks.",
  },
} as const;

export const adorePageContent = {
  title: "ADORE",
  subtitle: "Chapter 01 of The Broken",
  concept:
    "Adore là thời điểm cảm xúc còn đẹp nhưng đã bắt đầu có cạnh sắc. Mỗi chiếc áo là một chứng tích của khoảnh khắc đó.",
  products: [
    {
      chapter: "I",
      name: "THE ENTRY",
      easterEgg: "adore (v.) — to love dangerously.",
      details: [
        ["Mặt trước", "Logo thêu mảnh, lệch tâm nhẹ"],
        ["Mặt sau", "Typography ADORE dạng kéo dãn"],
        ["Tag đặc biệt", "Nhãn đỏ khâu tay ở sườn trái"],
        ["Kỹ thuật", "Garment wash + in mực nước"],
      ],
    },
    {
      chapter: "II",
      name: "THE BIRTH",
      easterEgg: "you let them in.",
      details: [
        ["Mặt trước", "Script nhỏ ở ngực, cân đối trống"],
        ["Mặt sau", "Khối text 2 cột, spacing rộng"],
        ["Tag đặc biệt", "Tag chữ Hebrew in đỏ sẫm"],
        ["Kỹ thuật", "Heavy cotton 260gsm"],
      ],
    },
    {
      chapter: "III",
      name: "THE INEVITABLE",
      easterEgg: "careful now. this is where it starts.",
      details: [
        ["Mặt trước", "Patch tối màu tone-on-tone"],
        ["Mặt sau", "Khung viền bản mảnh + mã chapter"],
        ["Tag đặc biệt", "Tag số thứ tự chapter"],
        ["Kỹ thuật", "Stone wash + distress nhẹ cổ áo"],
      ],
    },
  ],
} as const;
