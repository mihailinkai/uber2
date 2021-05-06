

// из всех пакетов кторые установили в проект,собираем один большой файл настройки 
// 1-ое - сначала BrowserSync , вытаскиваем из док-тации

// тут мы грим,что испл тот или иной проект (конкретно галп и браузер-синк)

const gulp        = require('gulp');
const browserSync = require('browser-sync');  
const sass        = require('gulp-sass'); 
// Static server
// создаем задачу,которая будет работать при помощи галпа (server - это имя)
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"  /* это папка,в которой лежит index.html */
        }
    });
});

// 2-ое - создаем компилятор sass (тут имя уже styles)


gulp.task('styles', function() {
    return gulp.src("src/sass/*.+(scss|sass)")  /* берем файлы по этому адресу */
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) /* компилируем в сасс */
            .pipe(gulp.dest("src/css")) /* сохраняем полу-шееся сюда */
            .pipe(browserSync.stream());  /*  после обновленя файла sass стр обновится */
});


// а эта задача будет следить за изменениями 

gulp.task('watch', function() {
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles"));
/*     галп следит за изме всех файлов
    ,когда они изменятся и сохранятся,запустится задача стайлс, когда задача выполнится, она 
    обновит наш браузер */
    gulp.watch("src/*.html").on("change", browserSync.reload);

});


//  объединяем задачи вместе, чтобы 1ой командой запустить весь функционал

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));