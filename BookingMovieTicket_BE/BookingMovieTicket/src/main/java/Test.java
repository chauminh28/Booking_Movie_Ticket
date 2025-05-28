public class Test {
    public static void main(String[] args) {
        String s = "https://res.cloudinary.com/dnpym3szs/image/upload/v1748415002/movies/y90zfrcdhovsnysaaiag.jpg";
        int i = s.indexOf("/upload/");
        String[] tmp = s.substring(i+1).split("[.]")[0].split("[/]");
        String result = tmp[tmp.length - 2] + "/" + tmp[tmp.length-1];
        System.out.println(result);
    }
}
