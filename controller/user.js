const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

exports.signupPage = (req, res) => {
  res.send("Hello world");
};
exports.signup = (req, res) => {
  const { id, name, password, confirmPassword } = req.body;
  const reg =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/;

  if (!id || !name || !password || !confirmPassword) {
    throw new BadRequestError("회원가입 오류입니다. 다시 입력해주세요.");
  }
  if (!reg.test(password)) {
    throw new BadRequestError("비밀번호 형식이 틀렸습니다.");
  }
  if (password !== confirmPassword) {
    throw new BadRequestError("비밀번호를 한번 더 확인해주세요.");
  }

  try {
    const user = new User({ id, name, password });

    User.checkDuplicatedId(id, (error, data) => {
      if (data > 0) {
        return res.status(400).json({ message: "아이디가 중복됩니다." });
      } else if (error) {
        return res.status(500).json({ message: error.message });
      }

      User.create(user, (error, data) => {
        if (error) {
          //에러 메세지 보내는거 (마음에 안듬 추후 재업로드)
          return (
            res
              .status(StatusCodes.BAD_REQUEST)
              //sqlError를 추후 숨겨야됨
              .json({ msg: error.sqlMessage })
          );
        }
        res.status(StatusCodes.CREATED).json({ data });
      });
    });
  } catch {
    throw new BadRequestError("데이터 처리 오류.");
  }
};
