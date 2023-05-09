require('dotenv').config();

const {
  express,
  mongoose,
  cookieParser,
  helmet,
  validationErrors,
} = require('./config');

const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { signInRouter } = require('./routes/singin');
const { signUpRouter } = require('./routes/singup');
const { notFoundRouter } = require('./routes/pathNotFound');

const { auth } = require('./middlewares/auth');
const { errors } = require('./middlewares/error');

const DATABASE = 'mongodb://localhost:27017/mestodb';
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(DATABASE);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', notFoundRouter);

app.use(validationErrors());
app.use(errors);

app.listen(PORT, () => {
  console.log('Сервер запущен на порту - ', PORT);
});
