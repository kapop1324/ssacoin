package com.ecommerce.controller.handler;

import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class FileHandler {
    public static String upload(MultipartFile image) {
        if(image.isEmpty()) throw new RuntimeException("빈 파일은 저장할 수 없습니다.");

        String filePath = "";

        //파일명을 업로드한 날짜로 변환하여 저장
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String current_date = now.format(dateTimeFormatter);

        //프로젝트 디렉토리 내의 저장을 위한 절대 경로
//        String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;
        String absolutePath = "/home/ubuntu" + File.separator + File.separator;
        //파일 상세 경로
        String path = "images" + File.separator + current_date;
        File file =  new File(path);

            if(!file.exists()){
                //상위 디렉토리가 존재하지않을때까지 생성
                file.mkdirs();
            }

        try {
            //파일 확장자 추출
            String originFileExtension = "";
            String contentType = image.getContentType();
            //파일 확장자가 존재하지 않으면 처리하지 않는다.
            if (ObjectUtils.isEmpty(contentType)) {

            } else {
                if (contentType.contains("image/jpeg")) {
                    originFileExtension = ".jpg";
                } else if (contentType.contains("image/png")) {
                    originFileExtension = ".png";
                } else if (contentType.contains("image/gif")) {
                    originFileExtension = ".gif";
                } else {

                }
            }

            //파일명 중복 피하기 위해 나노초까지 붙인다
            String newFileName = System.nanoTime() + originFileExtension;
            filePath = path + File.separator + newFileName;
            file = new File(absolutePath + path + File.separator + newFileName);
            image.transferTo(file);

            //파일 권한 설정
            file.setWritable(true);
            file.setReadable(true);


        }catch (IOException e){

        }
        return filePath;
    }
}
