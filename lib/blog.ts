export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readMinutes: number;
  category: string;
  tags: string[];
  keywords: string[];
  author: string;
  coverAccent?: "red" | "gold";
  blocks: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "hebrew-la-gi-local-brand-streetwear-viet-nam",
    title: "HEBREW là gì? Local brand streetwear Việt Nam bạn nên biết",
    excerpt:
      "Không phải fast fashion, không phải copy trend — HEBREW là câu chuyện thương hiệu đường phố Việt, limited drop và chất liệu được chọn kỹ.",
    publishedAt: "2026-03-10",
    readMinutes: 5,
    category: "Thương hiệu",
    tags: ["HEBREW", "local brand", "streetwear Việt Nam"],
    keywords: [
      "HEBREW streetwear",
      "local brand Việt Nam",
      "thương hiệu streetwear",
      "áo thun local brand",
    ],
    author: "HEBREW Editorial",
    coverAccent: "red",
    blocks: [
      {
        type: "p",
        text: "Nếu bạn từng lướt Instagram và thấy một chiếc tee có logo HEBREW trên nền đen — đó không phải ngẫu nhiên. Thương hiệu sinh ra từ cảm giác “đường phố Việt cần một ngôn ngữ riêng”: vừa cứng, vừa mềm, vừa tôn trọng chất liệu, vừa không sợ kể chuyện cảm xúc.",
      },
      {
        type: "h2",
        text: "HEBREW không bán “áo đẹp” — bán một chapter",
      },
      {
        type: "p",
        text: "Mỗi đợt drop giống một tập truyện ngắn. Chapter 01 ADORE nói về khoảnh khắc trước cơn bão — không phải tình yêu ngọt ngào, mà là giai đoạn nguy hiểm nhất khi mọi thứ sắp thay đổi. Bạn mua không chỉ vì form áo, mà vì bạn muốn mang theo một mảnh narrative đó.",
      },
      {
        type: "ul",
        items: [
          "Limited số lượng — không tái sản xuất vô hạn",
          "Chất liệu cotton nặng, form dành cho đi lại thật",
          "Thiết kế tối giản, chi tiết đỏ HEBREW làm điểm nhấn",
          "Cửa hàng tại Đà Nẵng & Hà Tĩnh — có thể thử trực tiếp",
        ],
      },
      {
        type: "quote",
        text: "Local brand không phải là rẻ hơn thương hiệu nước ngoài. Local brand là gần hơn — gần tay thợ, gần cộng đồng, gần câu chuyện bạn đang sống.",
      },
      {
        type: "p",
        text: "Muốn chạm vào sản phẩm? Vào shop online hoặc ghé cửa hàng. Muốn hiểu DNA thương hiệu? Đọc Our Story và khám phá collection ADORE — đó là điểm bắt đầu hợp lý nhất.",
      },
    ],
  },
  {
    slug: "limited-drop-khong-phai-chieu-marketing",
    title: "Limited drop không phải chiêu marketing — đó là cách HEBREW bảo vệ chất lượng",
    excerpt:
      "Vì sao HEBREW không làm kho vô hạn? Một góc nhìn vui, thẳng thắn về drop culture và trách nhiệm với người mặc.",
    publishedAt: "2026-03-18",
    readMinutes: 4,
    category: "Triết lý",
    tags: ["limited drop", "streetwear", "HEBREW"],
    keywords: [
      "limited drop streetwear",
      "mua áo limited",
      "drop culture Việt Nam",
    ],
    author: "HEBREW Editorial",
    coverAccent: "gold",
    blocks: [
      {
        type: "p",
        text: "Có người nói limited drop là FOMO — sợ bỏ lỡ. Một phần đúng trên thị trường. Nhưng với HEBREW, giới hạn số lượng còn là cách giữ tay nghề: in ít, kiểm kỹ hơn, không đẩy sản xuất đến mức phải cắt góc chất liệu.",
      },
      {
        type: "h2",
        text: "3 lý do drop nhỏ lại “vui” hơn",
      },
      {
        type: "ul",
        items: [
          "Bạn gặp người mặc cùng mẫu trên phố — cảm giác “hội kín”, không phải uniform đại trà",
          "Team có thời gian lắng nghe feedback trước khi ra đợt sau",
          "Giá trị sản phẩm không bị pha loãng bởi hàng tồn sale liên tục",
        ],
      },
      {
        type: "quote",
        text: "Không phải mọi người đều cần mua ngay. Nhưng nếu bạn đã theo dõi từ đầu chapter — bạn hiểu vì sao chiếc áo đó có ý nghĩa khác.",
      },
      {
        type: "p",
        text: "Tip: bật thông báo trên fanpage, theo dõi lookbook và vào /shop khi drop mở — ghim size trước, thanh toán nhanh. Đơn từ 2 sản phẩm được freeship — đủ lý do gom một chiếc cho bạn và một chiếc cho người “cùng vibe”.",
      },
    ],
  },
  {
    slug: "adore-chapter-01-khoanh-khac-truoc-con-bao",
    title: "ADORE Chapter 01: Khoảnh khắc trước cơn bão trên nền streetwear",
    excerpt:
      "Giải mã collection ADORE — The Entry, The Birth, The Inevitable — và vì sao đây là chapter dễ tổn thương nhất của HEBREW.",
    publishedAt: "2026-04-02",
    readMinutes: 6,
    category: "Collection",
    tags: ["ADORE", "HEBREW", "collection", "Chapter 01"],
    keywords: [
      "HEBREW ADORE",
      "collection streetwear",
      "áo thun HEBREW",
      "The Broken",
    ],
    author: "HEBREW Editorial",
    coverAccent: "red",
    blocks: [
      {
        type: "p",
        text: "ADORE không phải Valentine. Không có trái tim pastel. Đây là chapter về những gì xảy ra ngay trước khi mọi thứ đổi hướng — khi bạn vẫn giữ được vẻ bình thản nhưng bên trong đã rung.",
      },
      {
        type: "h2",
        text: "Ba “nhân vật” trong drop",
      },
      {
        type: "ul",
        items: [
          "THE ENTRY — bước chân đầu tiên không còn vô tội",
          "THE BIRTH — tình yêu đến như một vết nứt",
          "THE INEVITABLE — sau điểm này, không còn nút reset",
        ],
      },
      {
        type: "p",
        text: "Mỗi tee là một mức độ “nặng” khác nhau về chất liệu và cảm giác mặc — từ basic đến heavy. Lookbook chụp underexposed, film grain, hai người không bao giờ nhìn thẳng nhau: đúng tinh thần The Broken.",
      },
      {
        type: "quote",
        text: "Adore không phải tình yêu ngọt ngào. Đây là giai đoạn nguy hiểm nhất.",
      },
      {
        type: "p",
        text: "Xem full visual tại trang ADORE và Our Story. Nếu bạn đang tìm một món để bắt đầu — THE ENTRY là cửa ngõ an toàn nhất về mặt form; THE INEVITABLE dành cho ai đã quen tee dày và thích cảm giác “chìm” hơn trên da.",
      },
    ],
  },
  {
    slug: "tu-da-nang-den-hebrew-cua-hang-streetwear",
    title: "Từ Đà Nẵng đến HEBREW: Hành trình một thương hiệu streetwear Việt",
    excerpt:
      "Đà Nẵng, Hà Tĩnh và giấc mơ đưa streetwear local ra khỏi timeline — câu chuyện ngắn gọn, không màu mè.",
    publishedAt: "2026-04-15",
    readMinutes: 5,
    category: "Cộng đồng",
    tags: ["Đà Nẵng", "Hà Tĩnh", "cửa hàng HEBREW"],
    keywords: [
      "streetwear Đà Nẵng",
      "cửa hàng streetwear Hà Tĩnh",
      "HEBREW store",
      "local brand Đà Nẵng",
    ],
    author: "HEBREW Editorial",
    blocks: [
      {
        type: "p",
        text: "HEBREW không xuất phát từ phòng họp lớn. Nó bắt đầu từ những buổi trà đêm, từ việc thử vải đi thử vải lại, từ câu hỏi: “Sao mình không làm một thương hiệu mà người Việt mặc lên là thấy mình, không thấy bản copy Hàn hay Mỹ?”",
      },
      {
        type: "h2",
        text: "Vì sao có mặt tại Đà Nẵng & Hà Tĩnh",
      },
      {
        type: "p",
        text: "Đà Nẵng cho năng lượng trẻ, biển, và cộng đồng creative đang lớn. Hà Tĩnh là mảnh đất gắn với đội ngũ — nơi mọi người nhắc nhau giữ chất lượng thay vì chạy theo số lượng. Hai điểm chạm vật lý giúp khách không chỉ “đặt online rồi hy vọng vừa size”.",
      },
      {
        type: "ul",
        items: [
          "Thử form trực tiếp trước khi mua",
          "Gặp team, hỏi về chất liệu & cách bảo quản",
          "Chụp lookbook cùng bạn bè — vibe đường phố thật, không studio giả",
        ],
      },
      {
        type: "p",
        text: "Danh sách địa chỉ cập nhật tại trang Hệ thống cửa hàng. Online vẫn ship toàn quốc — nhưng nếu bạn ở miền Trung, ghé qua một lần sẽ hiểu vì sao fan HEBREW hay nói “mặc lên là khác”.",
      },
    ],
  },
  {
    slug: "5-cach-phoi-do-streetwear-hebrew-cho-nguoi-moi",
    title: "5 cách phối đồ streetwear HEBREW cho người mới (không cần closet khủng)",
    excerpt:
      "Từ một chiếc tee đỏ đen đến outfit hoàn chỉnh — gợi ý phối đồ thực tế, dễ làm, vẫn giữ vibe thương hiệu.",
    publishedAt: "2026-04-28",
    readMinutes: 4,
    category: "Style guide",
    tags: ["phối đồ streetwear", "outfit", "HEBREW"],
    keywords: [
      "phối đồ streetwear nam",
      "cách phối áo thun đen",
      "outfit local brand",
    ],
    author: "HEBREW Editorial",
    coverAccent: "gold",
    blocks: [
      {
        type: "p",
        text: "Bạn không cần 20 món để trông “đúng HEBREW”. Thương hiệu này sống nhờ tương phản: nền tối, một điểm đỏ, phom thoải mái. Dưới đây là 5 combo mà team hay mặc khi đi shoot hoặc đi cafe.",
      },
      {
        type: "h2",
        text: "Combo nhanh",
      },
      {
        type: "ul",
        items: [
          "Tee HEBREW + quần cargo rộng + sneaker trắng bẩn (có chủ ý)",
          "Tee tuck nhẹ một bên + belt vintage + boots đen",
          "Layer sơ mi flannel mở ngoài + tee in logo + jean ống rộng",
          "Toàn đen + một phụ kiện bạc — để tee làm protagonist",
          "Mũ lưỡi trai ngược + túi tote canvas — đi chợ cũng được, đi gig cũng được",
        ],
      },
      {
        type: "quote",
        text: "Streetwear không phải trông đắt — streetwear là trông có chủ đích.",
      },
      {
        type: "p",
        text: "Chưa chắc size? Đọc Hướng dẫn chọn size trên web trước khi đặt. Nhớ: freeship khi đơn từ 2 sản phẩm — rủ một người bạn gom đơn là hợp lý đấy.",
      },
    ],
  },
  {
    slug: "cham-soc-ao-thun-streetwear-ben-lau",
    title: "Chăm sóc áo thun streetwear để bền màu — checklist từ xưởng HEBREW",
    excerpt:
      "Giặt sai một lần có thể biến tee premium thành áo phai viền. Checklist ngắn giúp áo HEBREW sống lâu hơn trong tủ đồ.",
    publishedAt: "2026-05-08",
    readMinutes: 3,
    category: "Chăm sóc",
    tags: ["chăm sóc áo thun", "cotton", "HEBREW"],
    keywords: [
      "cách giặt áo thun cotton",
      "bảo quản áo streetwear",
      "áo thun local brand",
    ],
    author: "HEBREW Editorial",
    blocks: [
      {
        type: "p",
        text: "Cotton nặng thích được đối xử nhẹ nhàng — ironically. Áo streetwear đẹp nhất khi giữ được độ “đứng” của cổ áo và màu đen không bị chuyển sang xám tro.",
      },
      {
        type: "h2",
        text: "Checklist 60 giây",
      },
      {
        type: "ul",
        items: [
          "Lộn trái trước khi giặt — bảo vệ họa tiết và bề mặt vải",
          "Nước lạnh hoặc ấm nhẹ, chế độ nhẹ, không bleach",
          "Không sấy nhiệt cao — phơi bóng mát hoặc sấy thấp",
          "Ủi lộn trái hoặc hấp hơi nếu cần phẳng form",
          "Treo bằng vai áo thay vì móc cổ kéo dãn",
        ],
      },
      {
        type: "p",
        text: "Chi tiết hơn nằm ở trang Hướng dẫn chăm sóc sản phẩm. Làm đúng — bạn sẽ thấy tee “cũ đi” theo kiểu đẹp, không phải kiểu… buồn.",
      },
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
