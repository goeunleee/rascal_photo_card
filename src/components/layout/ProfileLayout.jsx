import React from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import Glass from "../modules/Glass";

const HandIconCircle = ({ kind, value }) => {
  // kind: "pitch" | "bat"
  // value 예시: "우투", "좌투", "우타", "좌타", "양타"
  let side = "?";

  if (kind === "pitch") {
    if (value?.includes("우")) side = "R";
    else if (value?.includes("좌")) side = "L";
  } else if (kind === "bat") {
    if (value?.includes("양"))
      side = "S"; // switch
    else if (value?.includes("우")) side = "R";
    else if (value?.includes("좌")) side = "L";
  }

  const colorMap = {
    R: "rgba(74, 160, 226, 0.77)", // 파랑
    L: "rgba(243, 130, 16, 0.9)", // 빨강
    S: "rgba(171,71,188,0.9)", // 보라 (양타)
    "?": "rgba(189,189,189,0.9)",
  };

  const labelMap = {
    pitch: "P",
    bat: "B",
  };

  const mainColor = colorMap[side] || colorMap["?"];
  const tag = labelMap[kind] || "?";

  return (
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        position: "relative",
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), ${mainColor})`,
        boxShadow: "0 0 18px rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      {/* 상단 라벨 (P / B) */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 10,
          fontSize: 16,
          fontWeight: 800,
          opacity: 0.9,
        }}
      >
        {tag}
      </Box>

      {/* 중앙 L / R / S */}
      <Box
        sx={{
          fontSize: 40,
          fontWeight: 900,
          letterSpacing: 2,
          fontFamily: 'Calibri, "Segoe UI", system-ui, sans-serif',
        }}
      >
        {side}
      </Box>
    </Box>
  );
};

// "\n" 혹은 "\\n" 모두 줄 배열로 변환
const toLines = (value) => {
  if (!value) return [];
  return value
    .toString()
    .replace(/\\n/g, "\n")
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
};

// 공통 Chip 컴포넌트
const ProfileChip = ({
  label,
  variant = "league",
  size = "lg",
  colorVariant, // 🔥 추가
}) => {
  const sizeMap = {
    sm: { fontSize: 16, px: 2, py: 0.5, radius: 20 },
    md: { fontSize: 20, px: 2.5, py: 0.7, radius: 24 },
    lg: { fontSize: 26, px: 3, py: 1, radius: 28 },
  };

  const { fontSize, px, py, radius } = sizeMap[size] || sizeMap.lg;

  const isLeague = variant === "league";
  const isTitle = variant === "title";

  // ✅ 타이틀 색상 분기
  const titleColorStyle =
    isTitle && colorVariant === "personal"
      ? {
          background:
            "linear-gradient(135deg, rgba(124,77,255,0.75), rgba(81,45,168,0.75))",
        } // 개인 통산 (보라, 투명)
      : isTitle
        ? {
            background:
              "linear-gradient(135deg, rgba(255,193,7,0.75), rgba(255,152,0,0.75))",
          } // 리그 타이틀 (골드, 투명)
        : {};

  return (
    <Chip
      label={label}
      variant={isLeague ? "outlined" : "filled"}
      sx={{
        borderRadius: radius,
        borderWidth: isLeague ? 2 : undefined,
        borderColor: isLeague ? "rgba(255,255,255,0.65)" : undefined,
        color: isLeague ? "#fff" : "#111",
        backgroundColor: isLeague ? "transparent" : undefined,
        height: 50,
        ...titleColorStyle,
        "& .MuiChip-label": {
          px,
          py,
          fontSize,
          fontWeight: isTitle ? 800 : 700,
          whiteSpace: "nowrap",
        },
      }}
    />
  );
};

const ProfileLayout = ({ player }) => {
  if (!player) return null;

  const name = player["이름"];
  const engName = player["영어 이름"];
  const number = player["등번호"];
  const pitch = player["투구"];
  const bat = player["타격"];

  const leagueLines = toLines(player["리그 참여"]);
  const titleLines = toLines(player["리그 타이틀"]);

  return (
    <Glass>
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 1.8,
        }}
      >
        {/* 이름 / 영어 이름 / 등번호 */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: 1.5,
          }}
        >
          <Typography fontSize={70} fontWeight={900} color="#fff">
            {name}
          </Typography>
          <Typography
            fontSize={50}
            fontWeight={700}
            color="rgba(255,255,255,0.7)"
          >
            / {engName}
          </Typography>
          <Typography fontSize={40} fontWeight={600} color="#fff">
            #{number}
          </Typography>
        </Box>
        {/* 투구 / 타격 : 아이콘 + 값 */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            mt: 1,
          }}
        >
          {/* 투구 / 타격 : 아이콘만 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              mt: 1,
            }}
          >
            {/* 투구 아이콘 */}
            <HandIconCircle kind="pitch" value={pitch} />

            {/* 타격 아이콘 */}
            <HandIconCircle kind="bat" value={bat} />
          </Box>
        </Box>

        {/* 리그 참여 + 리그 타이틀 한 줄에 Chip 나열 */}
        {(leagueLines.length > 0 || titleLines.length > 0) && (
          <Box sx={{ mt: 1 }}>
            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              sx={{
                columnGap: 2, // 가로 간격
                rowGap: 2, // ✅ 줄바꿈 후 세로 간격
                alignItems: "flex-start",
                "& > *": {
                  margin: 0, // ✅ Stack spacing에서 생기는 여분 제거
                },
              }}
            >
              {/* 리그 참여 : 투명 배경 + 보더 */}
              {leagueLines.map((text, idx) => (
                <ProfileChip
                  key={`league-${idx}`}
                  label={text}
                  variant="league"
                  size="lg" // 여기서 크기 조절: sm / md / lg
                />
              ))}

              {/* 리그 타이틀 : 색 있는 대형 칩 */}
              {titleLines.map((text, idx) => {
                const isPersonal = text.includes("개인 통산");

                return (
                  <ProfileChip
                    key={`title-${idx}`}
                    label={text}
                    variant="title"
                    size="lg"
                    colorVariant={isPersonal ? "personal" : "league"}
                  />
                );
              })}
            </Stack>
          </Box>
        )}
      </Box>
    </Glass>
  );
};

export default ProfileLayout;
